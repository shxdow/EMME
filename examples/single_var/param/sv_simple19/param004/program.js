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
      var x = new Int8Array(x_sab); Atomics.store(x, 0, 0);
      var x = new Int8Array(x_sab); Atomics.store(x, 1, 0);
      var x = new Int8Array(x_sab); Atomics.store(x, 2, 0);
      $262.agent.report(report);
      $262.agent.leaving();
   })
   `);

// Thread t2
$262.agent.start(
   `$262.agent.receiveBroadcast(function (x_sab) {
      var report = [];
      var x = new Int8Array(x_sab); Atomics.store(x, 1, 1);
      var x = new Int8Array(x_sab); Atomics.store(x, 2, 1);
      var x = new Int8Array(x_sab); Atomics.store(x, 3, 1);
      $262.agent.report(report);
      $262.agent.leaving();
   })
   `);

// Thread t3
$262.agent.start(
   `$262.agent.receiveBroadcast(function (x_sab) {
      var report = [];
      var x = new Int32Array(x_sab); id8_R_t3 = Atomics.load(x, 0); report.push("id8_R_t3: "+id8_R_t3);
      var x = new Int16Array(x_sab); id9_R_t3 = Atomics.load(x, 1); report.push("id9_R_t3: "+id9_R_t3);
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
outputs[1] = "id8_R_t3: 256;id9_R_t3: 0";
outputs[2] = "id8_R_t3: 65536;id9_R_t3: 0";
outputs[3] = "id8_R_t3: 65792;id9_R_t3: 0";
outputs[4] = "id8_R_t3: 16777216;id9_R_t3: 0";
outputs[5] = "id8_R_t3: 16777472;id9_R_t3: 0";
outputs[6] = "id8_R_t3: 16842752;id9_R_t3: 0";
outputs[7] = "id8_R_t3: 16843008;id9_R_t3: 0";
outputs[8] = "id8_R_t3: 0;id9_R_t3: 1";
outputs[9] = "id8_R_t3: 256;id9_R_t3: 1";
outputs[10] = "id8_R_t3: 65536;id9_R_t3: 1";
outputs[11] = "id8_R_t3: 65792;id9_R_t3: 1";
outputs[12] = "id8_R_t3: 16777216;id9_R_t3: 1";
outputs[13] = "id8_R_t3: 16777472;id9_R_t3: 1";
outputs[14] = "id8_R_t3: 16842752;id9_R_t3: 1";
outputs[15] = "id8_R_t3: 16843008;id9_R_t3: 1";
outputs[16] = "id8_R_t3: 0;id9_R_t3: 256";
outputs[17] = "id8_R_t3: 256;id9_R_t3: 256";
outputs[18] = "id8_R_t3: 65536;id9_R_t3: 256";
outputs[19] = "id8_R_t3: 65792;id9_R_t3: 256";
outputs[20] = "id8_R_t3: 16777216;id9_R_t3: 256";
outputs[21] = "id8_R_t3: 16777472;id9_R_t3: 256";
outputs[22] = "id8_R_t3: 16842752;id9_R_t3: 256";
outputs[23] = "id8_R_t3: 16843008;id9_R_t3: 256";
outputs[24] = "id8_R_t3: 0;id9_R_t3: 257";
outputs[25] = "id8_R_t3: 256;id9_R_t3: 257";
outputs[26] = "id8_R_t3: 65536;id9_R_t3: 257";
outputs[27] = "id8_R_t3: 65792;id9_R_t3: 257";
outputs[28] = "id8_R_t3: 16777216;id9_R_t3: 257";
outputs[29] = "id8_R_t3: 16777472;id9_R_t3: 257";
outputs[30] = "id8_R_t3: 16842752;id9_R_t3: 257";
outputs[31] = "id8_R_t3: 16843008;id9_R_t3: 257";
assert(-1 != outputs.indexOf(report));
