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
      for(i = 0; i <= 3; i++){
         var x = new Int8Array(x_sab); x[3] = 80.0+i;
      }
      var x = new Int32Array(x_sab); id3_R_t1 = x[0]; report.push("id3_R_t1: "+id3_R_t1);
      $262.agent.report(report);
      $262.agent.leaving();
   })
   `);

// Thread t2
$262.agent.start(
   `$262.agent.receiveBroadcast(function (x_sab) {
      var report = [];
      var x = new Float32Array(x_sab); id4_R_t2 = x[0]; report.push("id4_R_t2: "+id4_R_t2.toFixed(4));
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
      if (reports >= 2) break;
   }
}

report.sort();
report = report.join(";");
var outputs = [];
outputs[0] = "id3_R_t1: 1392508928;id4_R_t2: 0.0000";
outputs[1] = "id3_R_t1: 1392508928;id4_R_t2: 8589934592.0000";
outputs[2] = "id3_R_t1: 1392508928;id4_R_t2: 34359738368.0000";
outputs[3] = "id3_R_t1: 1392508928;id4_R_t2: 137438953472.0000";
outputs[4] = "id3_R_t1: 1392508928;id4_R_t2: 549755813888.0000";
assert(-1 != outputs.indexOf(report));
