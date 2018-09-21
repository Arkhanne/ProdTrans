export class Product {
  name = '';
  transactions = [];

  constructor(name) {
    this.name = name;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
