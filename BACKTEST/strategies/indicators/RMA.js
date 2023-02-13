var Indicator=function(weight){this.input='price';this.weight=weight;this.result=false;this.age=0;}
Indicator.prototype.update=function(price){if(this.result===false)
this.result=price;this.age++;this.calculate(price);return this.result;}
Indicator.prototype.calculate=function(price){var k=1/this.weight;var y=this.result;this.result=price*k+y*(1-k);}
module.exports=Indicator;
