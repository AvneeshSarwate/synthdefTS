(
var base = PathName(thisProcess.nowExecutingPath).pathOnly +/+ "../tests/fixtures";
base = base.standardizePath;
PathName(base).isFolder.if({},{ PathName(base).mkdir });

SynthDef(\test1, {
    Out.ar(0, SinOsc.ar(440) * 0.5)
}).writeDefFile(base);

SynthDef(\test2, { |freq=440, amp=0.5|
    Out.ar(0, SinOsc.ar(freq) * amp)
}).writeDefFile(base);

SynthDef(\test3, { |freq=440|
    Out.ar(0, Pan2.ar(SinOsc.ar(freq), 0))
}).writeDefFile(base);

SynthDef(\test4, { |gate=1|
    var env = EnvGen.kr(Env.asr, gate, doneAction: 2);
    Out.ar(0, SinOsc.ar(440) * env)
}).writeDefFile(base);

SynthDef(\test5, {
    Out.ar(0, LPF.ar(WhiteNoise.ar(0.2), 1000))
}).writeDefFile(base);

SynthDef(\test6, { |freq=220|
    Out.ar(0, LFPulse.ar(freq, 0, 0.5))
}).writeDefFile(base);

SynthDef(\test7, {
    Out.ar(0, In.ar(0, 2))
}).writeDefFile(base);

SynthDef(\test8, {
    var trig = Impulse.kr(1);
    SendReply.kr(trig, "/hello", [1, 2], 7);
}).writeDefFile(base);

SynthDef(\test9, {
    Out.ar(0, LocalIn.ar(2, [0.1, 0.2]))
}).writeDefFile(base);

SynthDef(\test10, {
    var sig = [SinOsc.ar(440), SinOsc.ar(880)];
    SendPeakRMS.kr(sig, 10, 2, "/peak", 5);
}).writeDefFile(base);

SynthDef(\test11, {
    var buf = LocalBuf(1024, 1);
    var sig = BufRd.ar(1, buf, DC.ar(0));
    Out.ar(0, sig);
}).writeDefFile(base);

SynthDef(\test12, {
    var env = Env.perc(0.01, 0.2, 1.0, -4);
    var sig = IEnvGen.kr(env, 0.1, 0.5, 0.25);
    Out.ar(0, DC.ar(sig));
}).writeDefFile(base);

SynthDef(\test13, {
    var trig = Impulse.kr(2);
    var seq = Dwrand([1, 2, 3], [0.2, 0.8], 4);
    var sig = Demand.kr(trig, 0, seq);
    Out.kr(0, sig);
}).writeDefFile(base);

SynthDef(\test14, {
    var trig = Impulse.kr(1);
    var sig = SinOsc.kr(2);
    Poll.kr(trig, sig, "poll", 3);
    Out.ar(0, DC.ar(sig));
}).writeDefFile(base);

SynthDef(\test15, {
    var trig = Impulse.kr(1);
    var seq = Dseq([1, 2, 3], 2);
    var polled = Dpoll(seq, "dpoll", 1, 2);
    var sig = Demand.kr(trig, 0, polled);
    Out.kr(0, sig);
}).writeDefFile(base);

0.exit;
)
