var RunnerConstants;
(function (RunnerConstants) {
    RunnerConstants["EVENT_HOOK_BEGIN"] = "hook";
    RunnerConstants["EVENT_HOOK_END"] = "hook end";
    RunnerConstants["EVENT_RUN_BEGIN"] = "start";
    RunnerConstants["EVENT_DELAY_BEGIN"] = "waiting";
    RunnerConstants["EVENT_DELAY_END"] = "ready";
    RunnerConstants["EVENT_RUN_END"] = "end";
    RunnerConstants["EVENT_SUITE_BEGIN"] = "suite";
    RunnerConstants["EVENT_SUITE_END"] = "suite end";
    RunnerConstants["EVENT_TEST_BEGIN"] = "test";
    RunnerConstants["EVENT_TEST_END"] = "test end";
    RunnerConstants["EVENT_TEST_FAIL"] = "fail";
    RunnerConstants["EVENT_TEST_PASS"] = "pass";
    RunnerConstants["EVENT_TEST_PENDING"] = "pending";
    RunnerConstants["EVENT_TEST_RETRY"] = "retry";
    RunnerConstants["STATE_IDLE"] = "idle";
    RunnerConstants["STATE_RUNNING"] = "running";
    RunnerConstants["STATE_STOPPED"] = "stopped";
})(RunnerConstants || (RunnerConstants = {}));
var TestConstants;
(function (TestConstants) {
    TestConstants["STATE_FAILED"] = "failed";
    TestConstants["STATE_PASSED"] = "passed";
    TestConstants["STATE_PENDING"] = "pending";
})(TestConstants || (TestConstants = {}));

export { RunnerConstants, TestConstants };
