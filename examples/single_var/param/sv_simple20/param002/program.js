// Copyright 2017 Cristian Mattarei
//
// Licensed under the modified BSD (3-clause BSD) License.
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// Thread t1
$262.agent.start(
   `$262.agent.receiveBroadcast(function (x_sab) {
      var report = [];
      var x = new Int8Array(x_sab); x[0] = 1;
      var x = new Int8Array(x_sab); x[1] = 1;
      var x = new Int8Array(x_sab); x[2] = 1;
      $262.agent.report(report);
      $262.agent.leaving();
   })
   `);

// Thread t2
$262.agent.start(
   `$262.agent.receiveBroadcast(function (x_sab) {
      var report = [];
      var x = new Int8Array(x_sab); x[1] = 0;
      var x = new Int8Array(x_sab); x[2] = 0;
      var x = new Int8Array(x_sab); x[3] = 0;
      $262.agent.report(report);
      $262.agent.leaving();
   })
   `);

// Thread t3
$262.agent.start(
   `$262.agent.receiveBroadcast(function (x_sab) {
      var report = [];
      var x = new Int32Array(x_sab); id8_R_t3 = x[0]; report.push("id8_R_t3: "+id8_R_t3);
      var x = new Int16Array(x_sab); id9_R_t3 = x[1]; report.push("id9_R_t3: "+id9_R_t3);
      $262.agent.report(report);
      $262.agent.leaving();
   })
   `);
var x_sab = new SharedArrayBuffer(8);
$262.agent.broadcast(x_sab);
var report = [];

// MAIN Thread

var thread_report;
var reports = 0;
var i = 0;
while (true) {
   thread_report = $262.agent.getReport();
   if (thread_report != null) {
      thread_report = thread_report.split(",");
      for(i=0; i < thread_report.length; i++){
         if(thread_report[i] == "") continue;
         report.push(thread_report[i]);
         print(thread_report[i]);
      }
      reports += 1;
      if (reports >= 3) break;
   }
}

report.sort();
report = report.join(";");
var outputs = [];
outputs[0] = "id8_R_t3: 0;id9_R_t3: 0";
outputs[1] = "id8_R_t3: 1;id9_R_t3: 0";
outputs[2] = "id8_R_t3: 256;id9_R_t3: 0";
outputs[3] = "id8_R_t3: 257;id9_R_t3: 0";
outputs[4] = "id8_R_t3: 65536;id9_R_t3: 0";
outputs[5] = "id8_R_t3: 65537;id9_R_t3: 0";
outputs[6] = "id8_R_t3: 65792;id9_R_t3: 0";
outputs[7] = "id8_R_t3: 65793;id9_R_t3: 0";
outputs[8] = "id8_R_t3: 0;id9_R_t3: 1";
outputs[9] = "id8_R_t3: 1;id9_R_t3: 1";
outputs[10] = "id8_R_t3: 256;id9_R_t3: 1";
outputs[11] = "id8_R_t3: 257;id9_R_t3: 1";
outputs[12] = "id8_R_t3: 65536;id9_R_t3: 1";
outputs[13] = "id8_R_t3: 65537;id9_R_t3: 1";
outputs[14] = "id8_R_t3: 65792;id9_R_t3: 1";
outputs[15] = "id8_R_t3: 65793;id9_R_t3: 1";
assert(-1 != outputs.indexOf(report));
