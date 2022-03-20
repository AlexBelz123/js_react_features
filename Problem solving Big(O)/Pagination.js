class Pagination {
  constructor(array, count) {
    this.array = array;
    this.count = count;
    this.currentPage = 1;
  }

  getVisibleItems() {
    this.lastIndex = this.currentPage * this.count;
    this.startIndex = this.lastIndex - this.count;
    return this.array.slice(this.startIndex, this.lastIndex);
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.array.length) {
      this.currentPage++;
    }
  }

  firstPage() {
    this.currentPage = 1;
  }

  lastPage() {
    this.currentPage = this.array.length / this.count;
  }
}


const p = new Pagination('123456789'.split(''), 3);
console.log(p.getVisibleItems());   // [1,2,3]
p.nextPage();
console.log(p.getVisibleItems());   // [4,5,6]
p.firstPage();
console.log(p.getVisibleItems());   // [1,2,3]
p.lastPage();
console.log(p.getVisibleItems());   // [7,8,9]
p.prevPage();
console.log(p.getVisibleItems());   // [4,5,6]