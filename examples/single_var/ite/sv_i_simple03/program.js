if (this.Worker) {
(function execution() {
var t1 =
`onmessage = function(data) {
var x = new Int8Array(data.x_sab); x[0] = 1;
var x = new Int8Array(data.x_sab); x[0] = 2;
};`;
var t2 =
`onmessage = function(data) {
var x = new Int8Array(data.x_sab); id4_R_t2 = x[0]; print("id4_R_t2: "+id4_R_t2);
var x = new Int8Array(data.x_sab); id5_R_t2 = x[0]; print("id5_R_t2: "+id5_R_t2);
if(id4_R_t2 == id5_R_t2) {
var x = new Int8Array(data.x_sab); id6_R_t2 = x[0]; print("id6_R_t2: "+id6_R_t2);
} else {
var x = new Int8Array(data.x_sab); id7_R_t2 = x[0]; print("id7_R_t2: "+id7_R_t2);
}
};`;
var data = {
x_sab : new SharedArrayBuffer(8),
}

var wt1 = new Worker(t1);
var wt2 = new Worker(t2);
wt1.postMessage(data, [data.x_sab]);
wt2.postMessage(data, [data.x_sab]);
})();
}