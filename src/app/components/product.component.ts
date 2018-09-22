export class Product {
  name = '';
  transactions = [];
  totalTransactions = 0;
  totalAmounts = [];
  totalEUR = 0;

  constructor(name) {
    this.name = name;
  }

  addTransaction(transaction, rates) {
    this.totalTransactions = this.transactions.push(transaction);
    this.addTotalAmount(transaction);
    this.addTotalEUR(transaction, rates);
  }

  private addTotalAmount(transaction) {
    const amountFounded = this.totalAmounts.find((amount) => {
      return amount.currency === transaction.currency;
    });

    if (amountFounded) {
      amountFounded.qty++;
      amountFounded.amount += transaction.amount;
      amountFounded.amount = this.round(amountFounded.amount);
    } else {
      this.totalAmounts.push({qty: 1, amount: this.round(transaction.amount), currency: transaction.currency});
    }
  }

  private addTotalEUR(transaction, rates) {
    let amount = transaction.amount;
    const currency = transaction.currency;

    if (currency !== 'EUR') {
      amount = this.amountToEUR(amount, currency, rates);
    }

    this.totalEUR += amount;
    this.totalEUR = this.round(this.totalEUR);
  }

  private amountToEUR(amount, currency, rates) {
    let rateFound = rates.find((rate) => {
      return rate.from === currency && rate.to === 'EUR';
    });

    if (rateFound) {
      return amount *= rateFound.rate;
    } else {
      rateFound = rates.find((rate) => {
        return rate.from === currency;
      });
      return this.amountToEUR(amount *= rateFound.rate, rateFound.to, rates);
    }
  }

  private round(value) {
    return Math.round(value * 100) / 100;
  }
}
