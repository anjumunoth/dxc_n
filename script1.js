// 2015 ES6 or ES2015 or java script 6

// Variable declarations
// var, let, const
// data types -- number, string,boolean, date,array,object
// java script -- weakly typed language
// java script -- implicitly executed as part of browser; embed it as part of html page
// js -- interpreted language
// js -- where to see errors ?? In the browser's console
// js -- Object prototype based language
// int i=10;
//i=10.5;i='h';i=true;

var i=10;// type inference;//number
i=true;//boolean
i=[10,20,30];//array
i=[10,"hello",true];//array
i={empId:101,empName:"sara"};
console.log("Emp Id "+ i.empId);//101

j=100;
console.log("J : "+ j);// 100
var j;// variable declaration hoisting -- Only declarations are hoisted to the top of the scope of the variable

console.log("k :"+k);// undefined
var k=1000;// var k; k=1000

var i="hello";// Redeclaration of variable using var keyword in the same scope
console.log("I : "+ i);//hello

//i={empId=1000};//Obj :- key:value ; syntactical error

i={empId:101,empName:"sara"};
console.log(i.salary);// undefined

//let -- similar to var keywork
// Diff -- scope ; var -- function scope; let -- block scope
// var -- redeclaration is allowed; let -- redeclaration is not allowed in the same scope

// const -- storing it as a constant

const PI=3.14;
console.log(PI);//3.14
// PI=3.142;
// console.log(PI);//3.142

const emp1={empId:101,empName:"sara"};
// emp1={empId:101,empName:"sara"};// exception
emp1.empId=777;
console.log("Emp values",emp1);//{empId:777,empName:"sara"}

function myFunc(p1,p2)
{
    console.log(p1+p2);
}

myFunc(10,20);// 30
myFunc(10);//NaN
myFunc();// NaN
myFunc(10,20,30);//30

myFunc(10,20);// 30
myFunc(10,"20");//"1020"
myFunc("10",20);//"1020"
myFunc("10","20");//"1020"

myFunc(10,20);//30
myFunc(10,true);//11; 

//Add all the parameters myFunc(10,20,30);//60

function myFunc1()
{
    var sum1=0;
    for(let i=0;i<myFunc1.arguments.length;i++)
    {
        sum1+=myFunc1.arguments[i];
    }
    console.log("Sum of the arguments"+ sum1);

}
myFunc1(10,20);// 30
myFunc1(10);//10
myFunc1();// 0
myFunc1(10,20,30);//60

// New in ES6 -- Rest paramter:(Internally it as an array)
// In a function, only one rest parameters allowed
// In a function, the rest parameter should be the last parameter
function myFunc2(...p1)
{
    var sum1=0;
    for(let i=0;i<p1.length;i++)
    {
        sum1+=p1[i];
    }
    console.log("Sum of the arguments"+ sum1);

}
myFunc2(10,20);// 30
myFunc2(10);//10
myFunc2();// 0
myFunc2(10,20,30);//60

/* function myFunc3(...p1,...p2)
{
    var sum1=0;
    for(let i=0;i<p1.length;i++)
    {
        sum1+=p1[i];
    }
    for(let i=0;i<p2.length;i++)
    {
        sum1+=p2[i];
    }
    console.log("Sum of the arguments"+ sum1);

}
myFunc3(10,20);// 30
myFunc3(10);//10
myFunc3();// 0
myFunc3(10,20,30);//60
myFunc3(10,20,30,"hello");//60hello
 */

function myFunc3(p1,...p2)
{
    var sum1=p1;
    
    for(let i=0;i<p2.length;i++)
    {
        sum1+=p2[i];
    }
    console.log("Sum of the arguments"+ sum1);

}
myFunc3(10,20);// 30;// p1=10; p2=[20]
myFunc3(10);//10;// p1=10;p2=[]
myFunc3();// ud;//p1=ud; p2=[]
myFunc3(10,20,30);//60;// p1=10;p2=[20,30]
myFunc3(10,20,30,"hello");//60hello// p1=10;p2=[20,30,"hello"]

/* function myFunc4(...p1,p2)
{
    var sum1=0;
    
    for(let i=0;i<p1.length;i++)
    {
        sum1+=p1[i];
    }
    console.log("Sum of the arguments"+ sum1 +p2);

}
// exception : Rest parameter must be last formal parameter
myFunc4(10,20);
myFunc4(10);
myFunc4();
myFunc4(10,20,30);
myFunc4(10,20,30,"hello");
 */

/*
Anonymous function
*/

function myFunc5(p1,p2){ console.log(p1+p2)};// named function
//anonymous function can be called using function literal
var f1=function (p1,p2)
{ 
    console.log(p1+p2)
};
f1(10,20);//30

// use case of anonymous function:
//1. To declare a function as part of an object
//2. Pass a function as a parameter to another function

var empObj={
    empId:101,
    empName:"sara",
    display:function ()
    {
        // anonymous function
        // "this" is mandatory
        // "this" -- refer to object on which the function is called
        console.log("EmpId "+ this.empId );
        console.log("EmpName "+ this.empName );
    }
}

empObj.display();//101; sara
empObj.empId=110;
empObj.display();//110; sara
// empObj.110=777;error
// Access obj.keyname
//empObj.printDetails();//error

function addTwoNums(p1,p2){return p1+p2};

function subTwoNums(p1,p2){return p1-p2};

function performCalculations(a1,a2,f1)
{
    var res=f1(a1,a2);
    console.log(res);
    var res1=addTwoNums(a1,a2);  
    console.log(res1);
    
    //var res1=mulTwoNums(a1,a2); //error 
    //console.log(res1);
    
}

performCalculations(10,20,addTwoNums);// a1=10; a2=20;data type of f1 -- function; 
//f1 is function  literal pointing to addTwoNums;//30;30
performCalculations(20,10,subTwoNums);//a1=20; a2=10;data type of f1 -- function; 
//f1 is function  literal pointing to subTwoNums;//10;30

performCalculations(10,20,function mulTwoNums(a1,a2){ return a1*a2 });// a1=10; a2=20;data type of f1 -- function; 
//f1 is function  literal pointing to mulTwoNums;//200;30

performCalculations(10,20,function (a1,a2){ return a1*a2 });// a1=10; a2=20;data type of f1 -- function; 
//f1 is function  literal pointing to mulTwoNums;//200;30

function myFunc6(p1,p2)
{
    //return n1+n2;
    return p1+p2;
}
function outerFunction()
{
    var n1=100,n2=200;
    var result=myFunc6(n1,n2);
    console.log("Result"+result);
}

outerFunction();//300

// Lambda functions or fat arrow functions:
// Special type of anonymous functions
// Usage : Shorter lines of code
// Scope of "this" operator -- lexical scope

var divTwoNums=function (a1,a2)
{
    return a1/a2;
}
var divTwoNums= (a1,a2) => {return a1/a2};
var divTwoNums1= a1 => {return a1/10};
var divTwoNums2= () => {return 10/2};
var divTwoNums3= (a1,a2) => a1/a2;

var empId=777;
var empObj={
    empId:101,
    empName:"sara",
    display:function ()
    {
        // anonymous function
        // "this" is mandatory
        // "this" -- refer to object on which the function is called
        console.log("EmpId "+ this.empId );
        console.log("EmpName "+ this.empName );
    },
    showDetails: () => {
        // scope of "this" -- lexical scope; outer scope(scope same as parent scope)
        console.log("Inside the fat arrow function");
        console.log("EmpId "+ this.empId );//777
        console.log("EmpName "+ this.empName );//ud
    }
}
empObj.display();//101,sara
empObj.showDetails();//"Inside the fat arrow function"

var arr1=[10,20,30,40,50];
// Create an array with square of arr1's elements

var sqArr=[];
for(let i=0;i<arr1.length;i++)
{
    sqArr[i]=arr1[i];
}

var sqArr1=arr1.map(function (item){
    return item*item;
})
// New feature in ES6

var sqArr1=arr1.map(item => item* item);
/*
map method
-- Iterate through the array elements and execute the fat arrow function with each element
-- Values returned are stored in a new array at their respective positions
-- Size of target array = size of resultant array
*/
console.log(sqArr1)//[100,400,900,1600,2500];

// Closures

function myFunc8(p1,p2)
{
    return p1+p2;
}

//console.log(p1);// error ; p1 is local to function myFunc8;

function myFunc9(p1,p2)
{
    //return 9;
    //return "9";
    //return [9];
    //return {value:9};
    //return a function -- yes
    return p1.toLowerCase;// returning a function
    //return p1.toLowerCase();// returning a string

}

var toLowerCaseRefFunction=myFunc9("H");// after this stat p1 goes of scope
console.log("Ref Function ",toLowerCaseRefFunction);
console.log("Ref Function ",myFunc9("STR"));
//var answerInLowerCase=toLowerCaseRefFunction("HELLO");
//console.log(answerInLowerCase);//exception beacuse p1 holding "H" is no more in scope;


function myFunc10(ctr)
{
    return function displayCtr()
    {
        console.log("Inside the returned function; Ctr : " +ctr);
    }
}

var returnFuncRef=myFunc10(100);// data type of returnFuncRef-- function
returnFuncRef();//"Inside the returned function; Ctr : 100"; Closure functions

/*
closure function : Function which returns a function(Returned function should have a reference to the outer variable)
Inside the displayCtr , ctr is accessed; so it will freeze the memory location even after the execution of myFunc10 is completed

*/
function myFunc11(ctr)
{
    return function displayCtr()
    {
        ctr++;
        console.log("Inside the returned function; Ctr : " +ctr);
    }
}
// myFunc11 -- closure function -- yes

var innerFunc=myFunc11(100);
innerFunc();//101
innerFunc();//102
innerFunc();//103

innerFunc=myFunc11(777);
innerFunc();//778

function getFullName(firstName,lastName)
{
    return function innerFunc(gender)
    {
        if(gender == "M")
            return "Mr." + firstName+ +" " +lastName ;
        else 
            return "Ms." + firstName +" " + lastName;
    }
}

var getFullNameWithTitle= getFullName("asha","mehta");
// data type of getFullNameWithTitle -- function

var fullName=getFullNameWithTitle("F");
console.log(fullName);//Ms.Asha Mehta

var fullName=getFullNameWithTitle("M");
console.log(fullName);//Mr.Asha Mehta

// Have added some additional functionality to getFullName without changing its code

// Callback function










