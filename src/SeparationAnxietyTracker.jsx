import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, AlertCircle, TrendingUp, Calendar, Target, BookOpen, ChevronDown, ChevronRight, Clock, Dog, Sparkles } from 'lucide-react';

export default function SeparationAnxietyTracker() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentWeek, setCurrentWeek] = useState(1);
  const [completedSessions, setCompletedSessions] = useState({});
  const [expandedWeeks, setExpandedWeeks] = useState({ 1: true });
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({ duration: '', threshold: '', notes: '', setup: '' });
  const [reactivityLogs, setReactivityLogs] = useState([]);
  const [newReactivityLog, setNewReactivityLog] = useState({ trigger: '', intensity: '3', recovery: '', notes: '' });
  const [dogName, setDogName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const nameVal = localStorage.getItem('dog_name');
      const sessionsVal = localStorage.getItem('completed_sessions');
      const logsVal = localStorage.getItem('training_logs');
      const weekVal = localStorage.getItem('current_week');
      const reactVal = localStorage.getItem('reactivity_logs');

      if (nameVal) setDogName(nameVal);
      if (sessionsVal) setCompletedSessions(JSON.parse(sessionsVal));
      if (logsVal) setLogs(JSON.parse(logsVal));
      if (weekVal) setCurrentWeek(parseInt(weekVal));
      if (reactVal) setReactivityLogs(JSON.parse(reactVal));
    } catch (e) {
      console.error('Load error:', e);
    }
    setLoading(false);
  }, []);

  const saveData = (key, value) => {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  };

  const toggleSession = (weekNum, sessionIdx) => {
    const key = `w${weekNum}_s${sessionIdx}`;
    const updated = { ...completedSessions, [key]: !completedSessions[key] };
    setCompletedSessions(updated);
    saveData('completed_sessions', updated);
  };

  const toggleWeek = (wk) => setExpandedWeeks({ ...expandedWeeks, [wk]: !expandedWeeks[wk] });

  const saveName = (name) => { setDogName(name); saveData('dog_name', name); };
  const saveWeek = (wk) => { setCurrentWeek(wk); saveData('current_week', String(wk)); };

  const addLog = () => {
    if (!newLog.duration) return;
    const entry = { ...newLog, date: new Date().toISOString(), week: currentWeek };
    const updated = [entry, ...logs];
    setLogs(updated);
    saveData('training_logs', updated);
    setNewLog({ duration: '', threshold: '', notes: '', setup: '' });
  };

  const addReactivityLog = () => {
    if (!newReactivityLog.trigger) return;
    const entry = { ...newReactivityLog, date: new Date().toISOString(), week: currentWeek };
    const updated = [entry, ...reactivityLogs];
    setReactivityLogs(updated);
    saveData('reactivity_logs', updated);
    setNewReactivityLog({ trigger: '', intensity: '3', recovery: '', notes: '' });
  };

  // 18-week program (late April → early September)
  const program = [
    {
      phase: 'PHASE 1 — FOUNDATION & DECOMPRESSION',
      weeks: [1, 2, 3, 4],
      color: 'phase-foundation',
      goal: 'Lower his baseline cortisol by reducing trigger exposure, start counter-conditioning the door/outside sounds, and only then begin separation work. You cannot train a calm alone-dog on top of a never-calm nervous system.',
      weekData: {
        1: {
          title: 'Environmental Management & Baseline',
          focus: "Week 1 is almost all management and observation. Before you train anything, you cut the number of daily triggers roughly in half. Every unmanaged trigger this week undoes training you will do later.",
          partnerRole: 'No deliveries opened while dog has line of sight. Calm boring hellos and goodbyes (no excited greetings). That is the entire ask this week.',
          sessions: [
            { day: 'Day 1', task: 'Management setup: frost or film the lower half of windows he barks out of (temporary privacy film from Amazon works). Block visual access to the gate/driveway from inside.' },
            { day: 'Day 2', task: 'Soundscape setup: play classical music or white noise in his main living area during delivery hours and gardener hours. Not loud, just enough to mask arrival sounds.' },
            { day: 'Day 3', task: 'SA baseline: camera recording, leave for 90 seconds. Note exact second of first body language shift (lip lick, yawn, freeze, ears back), not just the bark. Log in both.' },
            { day: 'Day 4', task: 'Reactivity baseline: for one full day, log every trigger event in the Reactivity Log. Trigger type, intensity 1-5, minutes to recover. You need this data.' },
            { day: 'Day 5', task: 'Communicate with your household: everyone agrees no one opens the door to deliveries while he has line of sight. Deliveries to the gate only, or pre-staged elsewhere. This is a household rule now, not training.' },
            { day: 'Day 6', task: 'Introduce "find it" game: toss a treat on the floor, say "find it" as he eats. Do 20 reps across the day in calm moments. This becomes your emergency redirect later.' },
            { day: 'Day 7', task: 'Rest. Review the reactivity log from Day 4. How many triggers? Which are worst? You now have your map.' },
          ],
          success: 'Trigger events reduced roughly 40-50% through management alone. You know his worst trigger and his SA baseline in seconds.',
        },
        2: {
          title: 'Doorbell & Arrival Counter-Conditioning',
          focus: "This week is classical conditioning, not obedience. Every time he hears a trigger sound, a high-value treat appears. Not because he's quiet, just because the sound happened. You are rewiring: 'that sound = chicken appears' instead of 'that sound = intruder.'",
          partnerRole: 'Same household rules as last week. If you hear me running doorbell reps, stay out of the room. Do not try to help.',
          sessions: [
            { day: 'Day 8', task: 'Prep high-value treats: tiny cubes of boiled chicken, cheese, or freeze-dried liver. Something he does not get otherwise. Portion into containers near every door.' },
            { day: 'Day 9', task: 'Recorded doorbell at 10% volume on your phone. Play the sound, immediately feed 3-5 treats one after another. 10 reps. Volume stays LOW. If he reacts, volume was too high.' },
            { day: 'Day 10', task: 'Same drill, doorbell at 15% volume. 10 reps, spaced across the day. Always: sound first, then treats.' },
            { day: 'Day 11', task: 'Rest from training. Continue management.' },
            { day: 'Day 12', task: 'Doorbell at 20-25% volume. 8 reps. If clean, try a single knock-on-door sound next.' },
            { day: 'Day 13', task: 'Add a second recorded trigger: delivery truck sounds, YouTube "garden tools ambient". Very low volume. 5 reps with treats.' },
            { day: 'Day 14', task: 'Rest. Notice: is his reaction to REAL triggers softer than a week ago? Even 10% softer is a huge signal.' },
          ],
          success: "When he hears a quiet recorded doorbell or delivery sound, he looks AT YOU expectantly instead of racing to the door. This is the 'conditioned emotional response' shifting.",
        },
        3: {
          title: 'SA Cue Desensitization + Live Trigger Protocol',
          focus: "Now SA work begins in earnest. Cue desensitization (keys, shoes, bag) runs in parallel with an emergency protocol for real-life triggers: the moment a gardener arrives or a delivery truck pulls up, you have a scripted response.",
          partnerRole: 'When YOU pick up your own keys/shoes/bag, do not leave immediately. Put them down, sit for a minute, then decide. This helps disarm the cue for both of us.',
          sessions: [
            { day: 'Day 15', task: 'SA: Pick up keys, put them down, sit on couch. 10 reps. Reactivity: when a real trigger happens, scatter a handful of treats on his mat saying "find it." Manage, do not train, in hot moments.' },
            { day: 'Day 16', task: 'SA: Put on shoes, take them off, 8 reps. Reactivity: continue doorbell CC at moderate volume, 5 reps.' },
            { day: 'Day 17', task: 'SA: Pick up bag, walk around with it. Reactivity: add real-world trigger exposure at DISTANCE: if gardener is outside, sit with him 10 meters from window with constant treats.' },
            { day: 'Day 18', task: 'Rest from structured training. Management still on.' },
            { day: 'Day 19', task: 'SA: combine cues (keys + shoes). 6 reps. No departure. Reactivity: 5 doorbell CC reps at 40% volume.' },
            { day: 'Day 20', task: 'SA: Full departure sequence including opening the door, then sitting back down. 4 reps. Reactivity: live delivery event protocol: toss treats, narrate calmly, stay with him.' },
            { day: 'Day 21', task: 'Rest. Review both logs for the week.' },
          ],
          success: 'He barely notices keys/shoes/bag. His recorded doorbell reaction is neutral. You have a working emergency protocol for live triggers.',
        },
        4: {
          title: 'First Real Absences + Trigger Generalization',
          focus: 'The actual alone-time training begins. Very short, sub-threshold, randomized. Reactivity work continues but the hot-trigger management stays firm.',
          partnerRole: 'If I am running absence reps, stay quiet and out of sight. Keep doing the household rules. If YOU leave the house this week, do it without fanfare: no goodbyes, no turning back.',
          sessions: [
            { day: 'Day 22', task: 'SA: Open door, step out, close door, immediately re-enter. 10 reps. Zero duration. Reactivity: doorbell CC at full volume, 5 reps.' },
            { day: 'Day 23', task: 'SA: 5-second absences. 8 reps, varied. Reactivity: knock-on-door recording, 5 reps.' },
            { day: 'Day 24', task: 'Rest. If a real trigger fires today, just manage it.' },
            { day: 'Day 25', task: 'SA: 10-20 second absences. 6 reps. Reactivity: stranger-at-door sound recording, 5 reps.' },
            { day: 'Day 26', task: 'SA: up to 30 seconds. 5 reps. CRUCIAL: do not leave during gardener hours. Not yet.' },
            { day: 'Day 27', task: 'SA: mixed 10s/25s/5s/30s/15s. Reactivity: try a single real-life controlled trigger: arrange a friend to ring the doorbell at a pre-planned time while you have treats ready.' },
            { day: 'Day 28', task: 'Rest. Review both logs. Are trigger-recovery times dropping?' },
          ],
          success: 'Sub-threshold 30 seconds alone, clean. Real doorbell reaction noticeably reduced in intensity or duration. Reactivity log shows a downward trend.',
        },
      },
    },
    {
      phase: 'PHASE 2 — BUILDING DURATION',
      weeks: [5, 6, 7, 8, 9],
      color: 'phase-duration',
      goal: 'Move from tens of seconds to tens of minutes. Keep weekly reactivity touch-ups so that baseline stays low while duration builds.',
      weekData: {
        5: {
          title: 'Seconds to Minutes',
          focus: 'SA is the main track now. Reactivity work drops to maintenance: 2-3 CC reps per week at full volume, plus continued live-trigger management.',
          partnerRole: 'Household rules remain. Low-drama departures when you leave. If a trigger fires while I am out, just manage it calmly and tell me after.',
          sessions: [
            { day: 'Day 29', task: 'SA: 30s, 45s, 60s. Three reps.' },
            { day: 'Day 30', task: 'SA: 60s, 90s, 45s.' },
            { day: 'Day 31', task: 'Rest.' },
            { day: 'Day 32', task: 'SA: 90s, 2min, 60s. Reactivity: doorbell CC, 3 reps.' },
            { day: 'Day 33', task: 'SA: 2min, 3min, 90s.' },
            { day: 'Day 34', task: 'Hold 2 min. 2 reps.' },
            { day: 'Day 35', task: 'Rest.' },
          ],
          success: '3 minutes clean, door/delivery reactivity holding at reduced baseline.',
        },
        6: {
          title: 'The 5-Minute Climb',
          focus: 'Add a reactivity stress test: CAN he handle a recorded doorbell mid-absence? Not yet. You will NOT test this till Phase 3. But set up to prevent it: schedule absences outside delivery hours, gardener days.',
          partnerRole: 'No change. Keep the rules tight. If you know deliveries are coming this week, tell me the expected window so I can avoid training then.',
          sessions: [
            { day: 'Day 36', task: 'SA: 3min, 4min, 2min.' },
            { day: 'Day 37', task: 'SA: 4min, 5min (attempt).' },
            { day: 'Day 38', task: 'Rest.' },
            { day: 'Day 39', task: 'SA: 5min, 3min.' },
            { day: 'Day 40', task: 'SA: varied, up to 6min.' },
            { day: 'Day 41', task: 'Hold 5min. Reactivity: 5 CC reps.' },
            { day: 'Day 42', task: 'Rest.' },
          ],
          success: '5-6 minutes clean, reactivity log stable.',
        },
        7: {
          title: 'The 10-Minute Climb',
          focus: 'Introduce gentle distraction: leave the TV on, play background noise. He needs to learn alone-time has many flavors.',
          partnerRole: 'Same rules. Keep TV or background noise on softly when you are home alone with him too. Helps normalize ambient sound.',
          sessions: [
            { day: 'Day 43', task: 'SA: 6min, 8min, 5min.' },
            { day: 'Day 44', task: 'SA: 8min, 10min (attempt).' },
            { day: 'Day 45', task: 'Rest.' },
            { day: 'Day 46', task: 'SA: 10min with TV on softly.' },
            { day: 'Day 47', task: 'SA: 12min.' },
            { day: 'Day 48', task: 'Hold 10min. 2 reps.' },
            { day: 'Day 49', task: 'Rest.' },
          ],
          success: '10 minutes, twice, one with background noise.',
        },
        8: {
          title: '15-20 Minutes',
          focus: 'Plateau is possible this week. If he regresses, drop back 30% and hold. Do not push through.',
          partnerRole: 'No change. If you notice him seeming more wound up than usual, tell me — it helps me decide whether to hold or push this week.',
          sessions: [
            { day: 'Day 50', task: 'SA: 12min, 15min, 10min.' },
            { day: 'Day 51', task: 'SA: 15min, 18min.' },
            { day: 'Day 52', task: 'Rest.' },
            { day: 'Day 53', task: 'SA: 20min (attempt). If fails, 15min.' },
            { day: 'Day 54', task: 'SA: 20min.' },
            { day: 'Day 55', task: 'Hold. Reactivity: check log, are recovery times still trending down?' },
            { day: 'Day 56', task: 'Rest.' },
          ],
          success: '20 minutes clean.',
        },
        9: {
          title: '30 Minutes & Settle Routine',
          focus: 'Introduce the pre-departure "settle" routine: a specific mat, a specific food puzzle, same sequence every time.',
          partnerRole: 'Important this week: when YOU leave, start following the settle routine too. I will show you the 8-step sequence. Same mat, same food puzzle, same order every time. This is the one thing only consistency makes work.',
          sessions: [
            { day: 'Day 57', task: 'SA: 22min + introduce settle mat.' },
            { day: 'Day 58', task: 'SA: 25min on mat.' },
            { day: 'Day 59', task: 'Rest.' },
            { day: 'Day 60', task: 'SA: 30min (attempt).' },
            { day: 'Day 61', task: 'SA: 30min.' },
            { day: 'Day 62', task: 'Hold 30min.' },
            { day: 'Day 63', task: 'Rest.' },
          ],
          success: '30 minutes clean, settle routine consistent.',
        },
      },
    },
    {
      phase: 'PHASE 3 — GENERALIZATION',
      weeks: [10, 11, 12, 13],
      color: 'phase-generalize',
      goal: 'Push from 30 minutes to 2 hours. CRITICALLY, this is when you find out whether his reactivity work holds while he is alone. That test matters more than any duration milestone.',
      weekData: {
        10: {
          title: 'The 1-Hour Mark',
          focus: 'If vet-prescribed anti-anxiety medication is on the table, now is when many behaviorists recommend the conversation. Not required for all dogs. Talk to your vet if progress stalls here.',
          partnerRole: 'Keep settle routine tight. This week I may bring up whether we should talk to the vet about a short-course medication for a high-stress event. Not a crisis, just a good question to ask.',
          sessions: [
            { day: 'Day 64', task: 'SA: 35min.' },
            { day: 'Day 65', task: 'SA: 45min.' },
            { day: 'Day 66', task: 'Rest.' },
            { day: 'Day 67', task: 'SA: 50min.' },
            { day: 'Day 68', task: 'SA: 60min (attempt).' },
            { day: 'Day 69', task: 'Hold 60min.' },
            { day: 'Day 70', task: 'Rest.' },
          ],
          success: '1 hour clean.',
        },
        11: {
          title: 'Reactivity-While-Alone Stress Test',
          focus: "The critical test. Up to now you have scheduled absences to avoid triggers. This week you deliberately set one up: 30 min absence with a PLANNED doorbell ring mid-session (friend rings, leaves). Review camera. His reaction tells you everything about whether the combined training is working.",
          partnerRole: 'This is the key test week. If I ask you to stay away from the house Thursday afternoon, please do. I am staging a controlled trigger and need clean conditions.',
          sessions: [
            { day: 'Day 71', task: 'SA: 60-75min, controlled conditions.' },
            { day: 'Day 72', task: 'Rest.' },
            { day: 'Day 73', task: 'THE TEST: 30min absence, friend rings doorbell at 15min mark (one ring, no follow-up). Review camera. Did he recover in under 3 min? 5? Still barking at your return?' },
            { day: 'Day 74', task: 'Based on Day 73: if he recovered within 5 min, proceed. If not, two weeks more of Phase 1 reactivity CC before continuing.' },
            { day: 'Day 75', task: 'SA: 75min.' },
            { day: 'Day 76', task: 'Hold.' },
            { day: 'Day 77', task: 'Rest.' },
          ],
          success: 'He can hear a doorbell while alone and return to settled within 5 minutes. This is the most important success criterion in the whole program.',
        },
        12: {
          title: 'Novel Environment + Sound Proofing',
          focus: "Practice alone-time at a friend's house if possible. Play ambient audio from an unfamiliar soundscape (cicadas, distant church bells, beach crowds) during home sessions.",
          partnerRole: "If we go to a friend or family home this week so I can train there, please just act normal. No commentary or attention to the dog during the session itself.",
          sessions: [
            { day: 'Day 78', task: "SA: 30-45min at a friend or family member's home." },
            { day: 'Day 79', task: "SA: 60min at same friend's home." },
            { day: 'Day 80', task: 'Rest.' },
            { day: 'Day 81', task: 'SA at home: 90min with unfamiliar ambient audio.' },
            { day: 'Day 82', task: 'SA: 90min, different ambient audio.' },
            { day: 'Day 83', task: 'Hold.' },
            { day: 'Day 84', task: 'Rest.' },
          ],
          success: '90 minutes in varied environments and soundscapes.',
        },
        13: {
          title: 'Two Hours',
          focus: 'This is roughly the length of a ceremony plus some reception time. If you hit this reliably, he can be left for short events.',
          partnerRole: 'Rules remain. Worth a conversation this week: what does the target event look like? Which parts can we realistically both attend, and where do we need a backup plan?',
          sessions: [
            { day: 'Day 85', task: 'SA: 100min.' },
            { day: 'Day 86', task: 'SA: 110min.' },
            { day: 'Day 87', task: 'Rest.' },
            { day: 'Day 88', task: 'SA: 2hr (attempt).' },
            { day: 'Day 89', task: 'SA: 2hr.' },
            { day: 'Day 90', task: 'Hold.' },
            { day: 'Day 91', task: 'Rest.' },
          ],
          success: '2 hours clean, across varied conditions.',
        },
      },
    },
    {
      phase: 'PHASE 4 — EVENT READINESS',
      weeks: [14, 15, 16, 17, 18],
      color: 'phase-wedding',
      goal: 'Build to 3-4 hours, simulate the target event exactly, prepare the travel setup.',
      weekData: {
        14: {
          title: '3-Hour Push',
          focus: 'Treat each 3-hour session as a dress rehearsal. Same food puzzle, same music, same mat.',
          partnerRole: 'If I am running a 3hr session, please plan to be out of the house too or stay quiet in one room. Do not come home midway.',
          sessions: [
            { day: 'Day 92', task: '2hr 15min.' },
            { day: 'Day 93', task: '2hr 30min.' },
            { day: 'Day 94', task: 'Rest.' },
            { day: 'Day 95', task: '2hr 45min.' },
            { day: 'Day 96', task: '3hr (attempt).' },
            { day: 'Day 97', task: 'Hold.' },
            { day: 'Day 98', task: 'Rest.' },
          ],
          success: '3 hours clean.',
        },
        15: {
          title: 'Full Event Rehearsal #1',
          focus: 'Simulate the exact day. Dress for the occasion. Do his full settle routine. Leave for 3-4 hours. Review camera.',
          partnerRole: 'You are in this one. Dress up with me, do the settle routine together, leave together. We both need to rehearse our departure behavior, not just the dog rehearsing being alone.',
          sessions: [
            { day: 'Day 99', task: '3hr wearing formal attire (new sensory cue).' },
            { day: 'Day 100', task: '3hr 30min.' },
            { day: 'Day 101', task: 'Rest.' },
            { day: 'Day 102', task: '3hr 30min with loud music nearby before departure.' },
            { day: 'Day 103', task: '3hr.' },
            { day: 'Day 104', task: 'Hold.' },
            { day: 'Day 105', task: 'Rest.' },
          ],
          success: '3.5 hours across simulated event conditions.',
        },
        16: {
          title: 'Travel Simulation',
          focus: 'Airbnb trial run if possible. Book a local Airbnb for 1-2 nights. Practice leaving him there. This is the single highest-value thing you can do before travel.',
          partnerRole: 'Full buy-in needed this week. Help scout and book a local Airbnb. Come along for the trial. This is us rehearsing the trip, not just me training the dog.',
          sessions: [
            { day: 'Day 106', task: 'Check into local Airbnb. Settle him. Do NOT leave first day.' },
            { day: 'Day 107', task: '1hr absence from Airbnb.' },
            { day: 'Day 108', task: '2hr absence from Airbnb.' },
            { day: 'Day 109', task: 'Rest, return home.' },
            { day: 'Day 110', task: '3hr absence (home).' },
            { day: 'Day 111', task: 'Hold.' },
            { day: 'Day 112', task: 'Rest.' },
          ],
          success: 'He can be alone in an unfamiliar Airbnb for 2+ hours.',
        },
        17: {
          title: 'Full Event Rehearsal #2',
          focus: 'Run the full duration you plan to leave him. Identify any last gaps.',
          partnerRole: 'Same as rehearsal #1. Dressed up, together, full routine. This is the last full dry run before travel.',
          sessions: [
            { day: 'Day 113', task: '4hr absence (planned event length).' },
            { day: 'Day 114', task: 'Rest.' },
            { day: 'Day 115', task: '4hr with full attire, music, departure sequence.' },
            { day: 'Day 116', task: 'Rest.' },
            { day: 'Day 117', task: '4hr final rehearsal.' },
            { day: 'Day 118', task: 'Hold.' },
            { day: 'Day 119', task: 'Rest.' },
          ],
          success: 'Full event-length absence, smooth.',
        },
        18: {
          title: 'Taper & Travel Prep',
          focus: 'Do NOT train heavily the week before travel. Short, easy sessions. Pack his mat, food puzzle, and familiar bedding.',
          partnerRole: 'Quiet, calm household this week. No major upheavals, no new visitors if avoidable. Help with packing his things.',
          sessions: [
            { day: 'Day 120', task: '30min easy session.' },
            { day: 'Day 121', task: '45min easy session.' },
            { day: 'Day 122', task: 'Pack his items. No training.' },
            { day: 'Day 123', task: '1hr session.' },
            { day: 'Day 124', task: 'Rest.' },
            { day: 'Day 125', task: 'Final short session, 30min.' },
            { day: 'Day 126', task: 'Travel day readiness.' },
          ],
          success: 'Calm, well-rested, routine intact.',
        },
      },
    },
  ];

  const allWeeks = program.flatMap(p => p.weeks.map(w => ({ week: w, phase: p })));
  const totalSessions = program.reduce((acc, phase) =>
    acc + phase.weeks.reduce((wacc, w) => wacc + (phase.weekData[w]?.sessions?.length || 0), 0), 0);
  const completedCount = Object.values(completedSessions).filter(Boolean).length;
  const progressPct = Math.round((completedCount / totalSessions) * 100);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f1ea] flex items-center justify-center">
        <div className="text-[#2d3e2a] font-serif text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f1ea]" style={{ fontFamily: 'Georgia, "Libre Caslon", serif' }}>
      <style>{`
        .font-display { font-family: 'Fraunces', Georgia, serif; font-variation-settings: "SOFT" 100; }
        .font-body { font-family: 'Work Sans', -apple-system, sans-serif; }
        .phase-foundation { background: #d4dfc7; border-color: #5a7052; }
        .phase-duration { background: #e8d5b7; border-color: #8b6f47; }
        .phase-generalize { background: #d4c5e2; border-color: #6b4e8b; }
        .phase-wedding { background: #f0c9c0; border-color: #a04040; }
        .ink { color: #2d2a26; }
        .ink-muted { color: #6b6660; }
        .ink-accent { color: #8b3a2a; }
        .paper { background: #fafaf5; }
        .deckle { box-shadow: 0 1px 0 rgba(0,0,0,0.03), 0 8px 20px rgba(60,50,40,0.08); }
        .tab-active { background: #2d2a26; color: #f4f1ea; }
        .tab-idle { background: transparent; color: #2d2a26; }
        .tab-idle:hover { background: rgba(45,42,38,0.08); }
        .ornament::before { content: "❦"; color: #8b3a2a; margin-right: 0.5rem; }
        .week-card { transition: all 0.2s ease; }
        .week-card:hover { transform: translateX(2px); }
        .check-btn { transition: all 0.15s ease; }
        .check-btn:active { transform: scale(0.95); }
        .log-entry { border-left: 3px solid #8b3a2a; }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="mb-10 border-b-2 border-[#2d2a26] pb-8">
          <div className="flex items-center gap-3 ink-accent font-body text-xs uppercase tracking-[0.3em] mb-4">
            <Dog className="w-4 h-4" />
            <span>A Separation Anxiety Program</span>
          </div>
          <h1 className="font-display text-6xl md:text-7xl ink leading-[0.95] mb-4">
            From Nairobi<br />
            <em className="text-[#8b3a2a]">to a Greek wedding</em>
          </h1>
          <p className="font-body ink-muted text-lg max-w-2xl leading-relaxed">
            An eighteen-week, evidence-based training plan tackling two linked problems at once: separation anxiety and barrier reactivity. Built on the DeMartini/Naismith sub-threshold method for SA and classical counter-conditioning for the doorbell, gardener, and delivery triggers that keep his nervous system wound.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <label className="font-body text-sm ink-muted">Dog's name:</label>
            <input
              type="text"
              value={dogName}
              onChange={(e) => saveName(e.target.value)}
              placeholder="enter here"
              className="font-display italic text-lg ink-accent bg-transparent border-b border-[#8b3a2a] focus:outline-none px-2 py-1"
            />
          </div>
        </header>

        {/* Tabs */}
        <nav className="flex gap-1 mb-8 border-b border-[#2d2a26]/20 pb-1 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BookOpen },
            { id: 'program', label: 'Weekly Program', icon: Calendar },
            { id: 'logbook', label: 'Logbook', icon: TrendingUp },
            { id: 'reactivity', label: 'Reactivity', icon: AlertCircle },
            { id: 'principles', label: 'Core Principles', icon: Target },
            { id: 'partner', label: 'For Partner', icon: Clock },
            { id: 'wedding', label: 'Event Day Kit', icon: Sparkles },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`${activeTab === id ? 'tab-active' : 'tab-idle'} font-body text-sm uppercase tracking-wider px-5 py-3 flex items-center gap-2 whitespace-nowrap`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="paper deckle p-8">
              <h2 className="font-display text-3xl ink mb-4">Where things stand</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="font-body text-xs uppercase tracking-wider ink-muted mb-2">Current baseline</div>
                  <div className="font-display text-4xl ink">~2 min</div>
                  <div className="font-body text-sm ink-muted mt-1">before barking</div>
                </div>
                <div>
                  <div className="font-body text-xs uppercase tracking-wider ink-muted mb-2">Target</div>
                  <div className="font-display text-4xl ink-accent">4 hrs</div>
                  <div className="font-body text-sm ink-muted mt-1">quiet, relaxed</div>
                </div>
                <div>
                  <div className="font-body text-xs uppercase tracking-wider ink-muted mb-2">Time to train</div>
                  <div className="font-display text-4xl ink">18 wks</div>
                  <div className="font-body text-sm ink-muted mt-1">enough runway</div>
                </div>
              </div>
            </div>

            <div className="paper deckle p-8">
              <h2 className="font-display text-3xl ink mb-4">Your progress</h2>
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-display text-5xl ink">{progressPct}%</span>
                <span className="font-body ink-muted">{completedCount} of {totalSessions} sessions complete</span>
              </div>
              <div className="w-full h-3 bg-[#2d2a26]/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#5a7052] via-[#8b6f47] to-[#8b3a2a] transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 font-body text-xs ink-muted">
                <span>Foundation</span>
                <span>Duration</span>
                <span>Generalize</span>
                <span>Event Ready</span>
              </div>
            </div>

            <div className="paper deckle p-8">
              <h2 className="font-display text-3xl ink mb-4 ornament">An honest note</h2>
              <div className="font-body ink space-y-4 leading-relaxed">
                <p>
                  Five months is real runway, and a dog whose only SA symptom is barking (no pacing, panting, drooling, destruction, or refusing food) has the most workable profile of any separation anxiety case. So the outlook is genuinely good.
                </p>
                <p>
                  But here is the part most online programs miss: <strong>reactivity and separation anxiety are the same engine.</strong> Both are rooted in "something is happening I cannot control." If he's spiking five or eight times a day at the gardener, at deliveries, at neighbors, and each spike takes 5-10 minutes to clear, his baseline cortisol is chronically elevated. You cannot train a calm alone-dog on top of a nervous system that never gets to calm.
                </p>
                <p>
                  That's why this plan front-loads two weeks of <strong>environmental management and reactivity counter-conditioning</strong> before the real SA work begins. This is not a delay; it's what makes the SA work actually land.
                </p>
                <p className="pl-4 border-l-2 border-[#8b3a2a]">
                  <strong>Progress is not linear.</strong> Expect regression weeks in both tracks. A dog who did 30 minutes clean last Tuesday may melt down at 10 this Friday, or recover from a delivery in 90 seconds one week and need 8 minutes the next. That is normal and does not mean you are failing. The program builds in rest days precisely because cortisol takes ~72 hours to fully clear from a dog's system.
                </p>
                <p className="pl-4 border-l-2 border-[#8b3a2a]">
                  <strong>You need a camera, always.</strong> You cannot do separation anxiety training by guessing. Every absence must be recorded so you can see the exact moment his body language shifts (before the barking, usually). A cheap security camera pointed at his mat is a non-negotiable tool.
                </p>
                <p>
                  If by Week 10 he has plateaued and cannot move past 30-45 minutes despite consistent work, that is the moment to consult a veterinary behaviorist about short-course anti-anxiety medication. Medication alongside training is not a failure; for many dogs it's what unlocks the last stretch.
                </p>
              </div>
            </div>

            <div className="paper deckle p-8">
              <h2 className="font-display text-3xl ink mb-4">What each phase does</h2>
              <div className="space-y-4">
                {program.map((phase, i) => (
                  <div key={i} className={`${phase.color} border-l-4 p-5`}>
                    <div className="font-body text-xs uppercase tracking-[0.2em] ink mb-1 opacity-70">
                      Weeks {phase.weeks[0]}–{phase.weeks[phase.weeks.length - 1]}
                    </div>
                    <h3 className="font-display text-2xl ink mb-2">{phase.phase}</h3>
                    <p className="font-body ink text-sm leading-relaxed">{phase.goal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WEEKLY PROGRAM */}
        {activeTab === 'program' && (
          <div className="space-y-4">
            <div className="paper deckle p-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="font-body text-xs uppercase tracking-wider ink-muted">Currently on</div>
                <div className="font-display text-2xl ink">Week {currentWeek}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => saveWeek(Math.max(1, currentWeek - 1))}
                  className="font-body text-sm px-4 py-2 border border-[#2d2a26] ink hover:bg-[#2d2a26] hover:text-[#f4f1ea] transition-colors"
                >← Previous</button>
                <button
                  onClick={() => saveWeek(Math.min(18, currentWeek + 1))}
                  className="font-body text-sm px-4 py-2 bg-[#2d2a26] text-[#f4f1ea] hover:bg-[#8b3a2a] transition-colors"
                >Next week →</button>
              </div>
            </div>

            {program.map((phase) => (
              <div key={phase.phase} className="space-y-3">
                <h2 className="font-display text-2xl ink-accent mt-8 mb-2">{phase.phase}</h2>
                {phase.weeks.map((wk) => {
                  const data = phase.weekData[wk];
                  const isExpanded = expandedWeeks[wk];
                  const sessionsCompleted = data.sessions.filter((_, i) => completedSessions[`w${wk}_s${i}`]).length;
                  const isCurrent = wk === currentWeek;
                  return (
                    <div key={wk} className={`week-card paper deckle ${isCurrent ? 'ring-2 ring-[#8b3a2a]' : ''}`}>
                      <button
                        onClick={() => toggleWeek(wk)}
                        className="w-full p-5 flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-4">
                          {isExpanded ? <ChevronDown className="w-5 h-5 ink-muted" /> : <ChevronRight className="w-5 h-5 ink-muted" />}
                          <div>
                            <div className="font-body text-xs uppercase tracking-wider ink-muted">Week {wk}</div>
                            <div className="font-display text-xl ink">{data.title}</div>
                          </div>
                        </div>
                        <div className="font-body text-sm ink-muted">
                          {sessionsCompleted}/{data.sessions.length}
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="px-5 pb-5 space-y-4">
                          <div className={`${phase.color} border-l-4 p-4`}>
                            <div className="font-body text-xs uppercase tracking-wider ink mb-1 opacity-70">This week's focus</div>
                            <p className="font-body ink text-sm leading-relaxed">{data.focus}</p>
                          </div>
                          {data.partnerRole && (
                            <div className="border-l-4 border-[#8b3a2a] bg-[#8b3a2a]/5 p-4">
                              <div className="font-body text-xs uppercase tracking-wider ink-accent mb-1">Partner role this week</div>
                              <p className="font-body ink text-sm leading-relaxed">{data.partnerRole}</p>
                            </div>
                          )}
                          <div className="space-y-2">
                            {data.sessions.map((s, i) => {
                              const done = completedSessions[`w${wk}_s${i}`];
                              return (
                                <button
                                  key={i}
                                  onClick={() => toggleSession(wk, i)}
                                  className={`check-btn w-full flex items-start gap-3 p-3 text-left border ${done ? 'bg-[#d4dfc7]/40 border-[#5a7052]/40' : 'border-[#2d2a26]/10 hover:border-[#2d2a26]/30'}`}
                                >
                                  {done
                                    ? <CheckCircle2 className="w-5 h-5 text-[#5a7052] flex-shrink-0 mt-0.5" />
                                    : <Circle className="w-5 h-5 ink-muted flex-shrink-0 mt-0.5" />
                                  }
                                  <div className="flex-1">
                                    <div className="font-body text-xs uppercase tracking-wider ink-accent mb-1">{s.day}</div>
                                    <div className={`font-body text-sm ${done ? 'ink-muted line-through' : 'ink'} leading-relaxed`}>
                                      {s.task}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                          <div className="bg-[#2d2a26]/5 p-4">
                            <div className="font-body text-xs uppercase tracking-wider ink-muted mb-1">Success criterion</div>
                            <p className="font-body ink text-sm italic">{data.success}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* LOGBOOK */}
        {activeTab === 'logbook' && (
          <div className="space-y-6">
            <div className="paper deckle p-6">
              <h2 className="font-display text-2xl ink mb-4 ornament">Log a session</h2>
              <p className="font-body ink-muted text-sm mb-4">
                Record what you saw on camera. The threshold is the second at which his body language first shifted (not just when barking started).
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-xs uppercase tracking-wider ink-muted block mb-1">Planned duration</label>
                  <input
                    type="text"
                    value={newLog.duration}
                    onChange={(e) => setNewLog({ ...newLog, duration: e.target.value })}
                    placeholder="e.g. 15 min"
                    className="w-full font-body p-3 border border-[#2d2a26]/20 bg-[#fafaf5] focus:outline-none focus:border-[#8b3a2a]"
                  />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-wider ink-muted block mb-1">Threshold (first distress)</label>
                  <input
                    type="text"
                    value={newLog.threshold}
                    onChange={(e) => setNewLog({ ...newLog, threshold: e.target.value })}
                    placeholder="e.g. 12 min, or N/A if clean"
                    className="w-full font-body p-3 border border-[#2d2a26]/20 bg-[#fafaf5] focus:outline-none focus:border-[#8b3a2a]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="font-body text-xs uppercase tracking-wider ink-muted block mb-1">Setup used</label>
                  <input
                    type="text"
                    value={newLog.setup}
                    onChange={(e) => setNewLog({ ...newLog, setup: e.target.value })}
                    placeholder="e.g. mat + kong + white noise, back door exit"
                    className="w-full font-body p-3 border border-[#2d2a26]/20 bg-[#fafaf5] focus:outline-none focus:border-[#8b3a2a]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="font-body text-xs uppercase tracking-wider ink-muted block mb-1">Observations</label>
                  <textarea
                    value={newLog.notes}
                    onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })}
                    placeholder="body language, when he settled, anything unusual..."
                    rows={3}
                    className="w-full font-body p-3 border border-[#2d2a26]/20 bg-[#fafaf5] focus:outline-none focus:border-[#8b3a2a]"
                  />
                </div>
              </div>
              <button
                onClick={addLog}
                disabled={!newLog.duration}
                className="mt-4 font-body text-sm uppercase tracking-wider px-6 py-3 bg-[#2d2a26] text-[#f4f1ea] hover:bg-[#8b3a2a] disabled:opacity-30 transition-colors"
              >
                Record entry
              </button>
            </div>

            <div className="paper deckle p-6">
              <h2 className="font-display text-2xl ink mb-4">History</h2>
              {logs.length === 0 ? (
                <p className="font-body ink-muted italic">No entries yet. Your first session logged will appear here.</p>
              ) : (
                <div className="space-y-3">
                  {logs.map((log, i) => (
                    <div key={i} className="log-entry pl-4 py-2">
                      <div className="flex justify-between items-baseline mb-1">
                        <div className="font-display text-lg ink">{log.duration}</div>
                        <div className="font-body text-xs ink-muted">
                          Week {log.week} · {new Date(log.date).toLocaleDateString()}
                        </div>
                      </div>
                      {log.threshold && (
                        <div className="font-body text-sm ink-muted mb-1">
                          <span className="uppercase tracking-wider text-xs">Threshold: </span>{log.threshold}
                        </div>
                      )}
                      {log.setup && (
                        <div className="font-body text-sm ink-muted mb-1">
                          <span className="uppercase tracking-wider text-xs">Setup: </span>{log.setup}
                        </div>
                      )}
                      {log.notes && <div className="font-body text-sm ink italic mt-1">"{log.notes}"</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* REACTIVITY */}
        {activeTab === 'reactivity' && (
          <div className="space-y-6">
            <div className="paper deckle p-8">
              <h2 className="font-display text-3xl ink mb-4 ornament">Why this matters</h2>
              <div className="font-body ink space-y-3 leading-relaxed">
                <p>
                  Reactivity and separation anxiety share one emotional engine: "something is happening I cannot control." When he fires off at the gardener or a delivery, his stress hormones spike for roughly 10 minutes. At five or eight triggers a day, his cortisol never fully clears.
                </p>
                <p>
                  This is why Weeks 1-2 front-load reactivity work before the "real" SA training starts. Every unmanaged trigger this week is a session of SA training you lose later. The two tracks are not parallel, they are <em>entangled.</em>
                </p>
              </div>
            </div>

            <div className="paper deckle p-8">
              <h2 className="font-display text-3xl ink mb-4 ornament">Log a reactivity event</h2>
              <p className="font-body ink-muted text-sm mb-4">
                Track every significant trigger. You need this data to see whether baseline is actually dropping, which is the real measure of progress.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-xs uppercase tracking-wider ink-muted block mb-1">Trigger</label>
                  <input
                    type="text"
                    value={newReactivityLog.trigger}
                    onChange={(e) => setNewReactivityLog({ ...newReactivityLog, trigger: e.target.value })}
                    placeholder="e.g. doorbell, gardener, motorbike"
                    className="w-full font-body p-3 border border-[#2d2a26]/20 bg-[#fafaf5] focus:outline-none focus:border-[#8b3a2a]"
                  />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-wider ink-muted block mb-1">Intensity (1-5)</label>
                  <select
                    value={newReactivityLog.intensity}
                    onChange={(e) => setNewReactivityLog({ ...newReactivityLog, intensity: e.target.value })}
                    className="w-full font-body p-3 border border-[#2d2a26]/20 bg-[#fafaf5] focus:outline-none focus:border-[#8b3a2a]"
                  >
                    <option value="1">1 — alert, one woof</option>
                    <option value="2">2 — bark, recoverable</option>
                    <option value="3">3 — frantic barking</option>
                    <option value="4">4 — barking + lunging/pacing</option>
                    <option value="5">5 — over threshold, cannot redirect</option>
                  </select>
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-wider ink-muted block mb-1">Minutes to recover</label>
                  <input
                    type="text"
                    value={newReactivityLog.recovery}
                    onChange={(e) => setNewReactivityLog({ ...newReactivityLog, recovery: e.target.value })}
                    placeholder="e.g. 3"
                    className="w-full font-body p-3 border border-[#2d2a26]/20 bg-[#fafaf5] focus:outline-none focus:border-[#8b3a2a]"
                  />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-wider ink-muted block mb-1">Notes</label>
                  <input
                    type="text"
                    value={newReactivityLog.notes}
                    onChange={(e) => setNewReactivityLog({ ...newReactivityLog, notes: e.target.value })}
                    placeholder="what helped? what didn't?"
                    className="w-full font-body p-3 border border-[#2d2a26]/20 bg-[#fafaf5] focus:outline-none focus:border-[#8b3a2a]"
                  />
                </div>
              </div>
              <button
                onClick={addReactivityLog}
                disabled={!newReactivityLog.trigger}
                className="mt-4 font-body text-sm uppercase tracking-wider px-6 py-3 bg-[#2d2a26] text-[#f4f1ea] hover:bg-[#8b3a2a] disabled:opacity-30 transition-colors"
              >
                Record trigger event
              </button>
            </div>

            {reactivityLogs.length > 0 && (
              <div className="paper deckle p-8">
                <h2 className="font-display text-2xl ink mb-4">Recent trigger events</h2>
                <div className="space-y-3">
                  {reactivityLogs.slice(0, 15).map((log, i) => (
                    <div key={i} className="log-entry pl-4 py-2">
                      <div className="flex justify-between items-baseline mb-1 flex-wrap gap-2">
                        <div className="font-display text-lg ink">{log.trigger}</div>
                        <div className="font-body text-xs ink-muted">
                          Intensity {log.intensity}/5 · {log.recovery || '?'} min · Wk {log.week} · {new Date(log.date).toLocaleDateString()}
                        </div>
                      </div>
                      {log.notes && <div className="font-body text-sm ink italic mt-1">"{log.notes}"</div>}
                    </div>
                  ))}
                </div>
                {reactivityLogs.length > 15 && (
                  <p className="font-body text-xs ink-muted mt-4 italic">Showing 15 most recent of {reactivityLogs.length} entries.</p>
                )}
              </div>
            )}

            <div className="paper deckle p-8">
              <h2 className="font-display text-3xl ink mb-4 ornament">The counter-conditioning protocol</h2>
              <p className="font-body ink leading-relaxed mb-4">
                This is classical conditioning. You are not teaching him to be quiet. You are rewiring his emotional response to a sound. The sound predicts chicken. That is all.
              </p>
              <ol className="space-y-3 font-body ink">
                {[
                  { h: "Sound first, then treat — always in that order", d: "If the treat appears before or at the same time as the sound, he learns 'treats cause doorbells,' which is the opposite of what you want." },
                  { h: "Treats must be high-value", d: "Boiled chicken, cheese, freeze-dried liver. Not kibble. The emotional shift only happens if the reward is significantly better than his normal fare." },
                  { h: "He does not have to be quiet to earn the treat", d: "This is not obedience training. The treat comes whether he barks or not. Over time, he stops barking because the sound now predicts something good." },
                  { h: "Start sub-threshold", d: "At 10-15% volume on a recording. If he reacts, you went too loud. Drop volume by half." },
                  { h: "Only raise difficulty when he is neutral", d: "He should look at you expectantly when the sound plays before you add volume, distance, or realism." },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-display text-xl ink-accent flex-shrink-0">{i + 1}</span>
                    <div>
                      <div className="font-display text-lg ink">{item.h}</div>
                      <div className="font-body text-sm ink-muted leading-relaxed">{item.d}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="paper deckle p-8">
              <h2 className="font-display text-3xl ink mb-4 ornament">Emergency protocol for live triggers</h2>
              <p className="font-body ink leading-relaxed mb-4">
                Real life will not wait for him to be ready. The gardener will arrive. The delivery will come. When you cannot prevent a live trigger, you have a script.
              </p>
              <ol className="space-y-2 font-body ink">
                {[
                  "Scatter a handful of small treats on his mat or the floor. Say 'find it.'",
                  "Move him away from the trigger source (into another room, away from the window).",
                  "Stay calm. Do not shush, scold, or use a tense voice. Narrate in a bored tone: 'just the gardener, boring.'",
                  "Close blinds, play music, raise the ambient noise floor.",
                  "Once the trigger is gone, wait 10 minutes of full calm before any other training happens.",
                  "Log the event in the reactivity log so you can see whether intensity and recovery are trending down.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-display text-lg ink-accent flex-shrink-0">{i + 1}.</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* FOR PARTNER */}
        {activeTab === 'partner' && (() => {
          const currentPhase = program.find(p => p.weeks.includes(currentWeek));
          const currentData = currentPhase?.weekData[currentWeek];
          return (
            <div className="space-y-6">
              <div className="paper deckle p-8">
                <div className="font-body text-xs uppercase tracking-[0.3em] ink-accent mb-3">For the household</div>
                <h2 className="font-display text-4xl ink mb-4">Where we are right now</h2>
                <p className="font-body ink-muted leading-relaxed mb-2">
                  This page is the one place you need to check. It shows the current week, the rules we are holding as a household, and what is being asked of you specifically.
                </p>
                <p className="font-body ink-muted leading-relaxed">
                  You do not need to read anything else in this app. {dogName ? dogName + "'s" : "His"} training itself is being handled. Your part is the rules, and they are short.
                </p>
              </div>

              <div className="paper deckle p-8">
                <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
                  <div>
                    <div className="font-body text-xs uppercase tracking-wider ink-muted">Currently on</div>
                    <div className="font-display text-3xl ink">Week {currentWeek} of 18</div>
                    <div className="font-body text-sm ink-muted italic mt-1">{currentData?.title}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-body text-xs uppercase tracking-wider ink-muted">Progress</div>
                    <div className="font-display text-3xl ink-accent">{progressPct}%</div>
                  </div>
                </div>
                {currentData?.partnerRole && (
                  <div className="border-l-4 border-[#8b3a2a] bg-[#8b3a2a]/5 p-6">
                    <div className="font-body text-xs uppercase tracking-wider ink-accent mb-2">This week, your role is</div>
                    <p className="font-display text-xl ink leading-relaxed">{currentData.partnerRole}</p>
                  </div>
                )}
              </div>

              <div className="paper deckle p-8">
                <h2 className="font-display text-3xl ink mb-2 ornament">The household rules</h2>
                <p className="font-body ink-muted text-sm mb-6 leading-relaxed">
                  These hold every day, every week, for the full program. They are what prevents the training from being undone.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      n: '01',
                      rule: 'No deliveries answered in his line of sight',
                      detail: 'Take packages at the gate, step outside, or wait until he is in another room. The sound of the doorbell followed by a stranger at the door is his single worst trigger. Every event like this undoes a week of counter-conditioning.',
                    },
                    {
                      n: '02',
                      rule: 'Calm, boring hellos and goodbyes',
                      detail: 'No "hi buddy!" voice. No dramatic departures. When you come home, wait 60 seconds of calm before interacting with him. When you leave, just leave. Both ends of the door matter.',
                    },
                    {
                      n: '03',
                      rule: 'No letting him race to windows or doors',
                      detail: 'If something happens outside, stay calm, redirect him (scatter a few treats on his mat, say "find it") and move him to another room if needed. Do not yell "shush." Do not look out the window with him. Boring response from you teaches boring response from him.',
                    },
                    {
                      n: '04',
                      rule: 'During gardener hours, he is on the far side of the house',
                      detail: 'Frozen Kong or lick mat in the bedroom or furthest room, door closed, music on softly. Every gardener day. This is management, not training, but it is non-negotiable.',
                    },
                    {
                      n: '05',
                      rule: 'If you are the one leaving, follow the settle routine',
                      detail: 'Starting Week 9: same mat, same food puzzle, same sequence every time you leave the house without him. The routine only works if it is identical every time.',
                    },
                  ].map((r) => (
                    <div key={r.n} className="flex gap-5 p-5 bg-[#fafaf5] border border-[#2d2a26]/10">
                      <div className="font-display text-4xl ink-accent flex-shrink-0 leading-none">{r.n}</div>
                      <div>
                        <div className="font-display text-xl ink mb-1">{r.rule}</div>
                        <div className="font-body text-sm ink-muted leading-relaxed">{r.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="paper deckle p-8">
                <h2 className="font-display text-2xl ink mb-4 ornament">If he is barking and you do not know what to do</h2>
                <ol className="space-y-2 font-body ink">
                  {[
                    'Stay calm. Do not yell, shush, or use a tense voice.',
                    'Scatter a small handful of treats on his mat. Say "find it" in a bored tone.',
                    'Move him to another room if the trigger is still active.',
                    'Close blinds or raise ambient noise (music, fan).',
                    'Do not comfort him with attention while he is barking. Wait for a pause, then reward calm.',
                    'Tell me what happened when I am next around. It helps me adjust.',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-display text-lg ink-accent flex-shrink-0">{i + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="font-body text-xs ink-muted text-center italic mt-4">
                Bookmark this page on your phone. That is the whole app from your side.
              </p>
            </div>
          );
        })()}

        {/* CORE PRINCIPLES */}
        {activeTab === 'principles' && (
          <div className="space-y-6">
            <div className="paper deckle p-8">
              <h2 className="font-display text-3xl ink mb-6 ornament">The sub-threshold rule</h2>
              <p className="font-body ink leading-relaxed mb-4">
                This is the single most important principle. Every absence, and every reactivity rep, must stay <em>under</em> the threshold at which he becomes anxious. If you push past it, you are practicing anxiety, not calm.
              </p>
              <p className="font-body ink leading-relaxed">
                The hardest part: this means shorter, slower progress than your instincts will want. A dog who hits 30 minutes might need to drop back to 10 for a week if he has a bad session. That is the work.
              </p>
            </div>

            <div className="paper deckle p-8">
              <h2 className="font-display text-3xl ink mb-6 ornament">Trigger stacking</h2>
              <p className="font-body ink leading-relaxed mb-4">
                Cortisol, the main canine stress hormone, takes roughly 72 hours to fully clear. If a dog triggers on Monday morning, again Monday afternoon, and again Tuesday, he never gets back to baseline.
              </p>
              <p className="font-body ink leading-relaxed">
                This is why management matters as much as training. A dog who triggers 6 times a day and does 20 minutes of "training" will not improve. A dog who triggers 1 time a day because you blocked windows, masked sounds, and rescheduled deliveries — and does 20 minutes of training — will change measurably in two weeks.
              </p>
            </div>

            <div className="paper deckle p-8">
              <h2 className="font-display text-3xl ink mb-6 ornament">The four non-negotiables</h2>
              <div className="space-y-5">
                <div>
                  <h3 className="font-display text-xl ink-accent mb-1">1. Record every absence</h3>
                  <p className="font-body ink-muted text-sm leading-relaxed">A phone on a shelf, a pet camera, anything. You need to see the first micro-sign of anxiety, which comes before vocalization: lip licking, yawning, whale-eye, tense posture. That moment is your real threshold.</p>
                </div>
                <div>
                  <h3 className="font-display text-xl ink-accent mb-1">2. No over-threshold days early on</h3>
                  <p className="font-body ink-muted text-sm leading-relaxed">For the first four weeks, he should not be left alone beyond his training sessions. Every over-threshold absence undoes days of progress. If you must leave him longer, daycare, a sitter, or bringing him along are options.</p>
                </div>
                <div>
                  <h3 className="font-display text-xl ink-accent mb-1">3. Rest days are not optional</h3>
                  <p className="font-body ink-muted text-sm leading-relaxed">Cortisol takes roughly 72 hours to clear. Back-to-back training sessions produce a dog whose baseline stress is always elevated. Honor the rest days in the program.</p>
                </div>
                <div>
                  <h3 className="font-display text-xl ink-accent mb-1">4. Randomize, do not linearly increase</h3>
                  <p className="font-body ink-muted text-sm leading-relaxed">If you always extend duration, he learns "the absences get worse." If you randomize (30s, 10s, 45s, 5s, 25s), he learns "this ends quickly, usually." Unpredictability in YOUR favor is how you build tolerance.</p>
                </div>
              </div>
            </div>

            <div className="paper deckle p-8">
              <h2 className="font-display text-3xl ink mb-6 ornament">Common mistakes</h2>
              <ul className="space-y-3 font-body ink">
                <li className="flex gap-3">
                  <AlertCircle className="w-5 h-5 ink-accent flex-shrink-0 mt-0.5" />
                  <span><strong>Over-reliance on food puzzles.</strong> A Kong or lick mat helps some dogs but masks anxiety in others. If he finishes the Kong and then panics, the Kong is not the training; the panic is. Camera shows truth.</span>
                </li>
                <li className="flex gap-3">
                  <AlertCircle className="w-5 h-5 ink-accent flex-shrink-0 mt-0.5" />
                  <span><strong>Big departure fanfare.</strong> No long goodbyes. Calm, boring, unremarkable departures and returns. If you are dramatic, he learns departures are dramatic.</span>
                </li>
                <li className="flex gap-3">
                  <AlertCircle className="w-5 h-5 ink-accent flex-shrink-0 mt-0.5" />
                  <span><strong>Tiring him out first.</strong> A tired dog is not a calm dog, just a tired one. Exercise is good for overall wellbeing but does not address SA directly.</span>
                </li>
                <li className="flex gap-3">
                  <AlertCircle className="w-5 h-5 ink-accent flex-shrink-0 mt-0.5" />
                  <span><strong>Skipping the cue desensitization phase.</strong> Those first weeks feel slow. They are the foundation of everything else. Do not skip.</span>
                </li>
              </ul>
            </div>

            <div className="paper deckle p-8">
              <h2 className="font-display text-3xl ink mb-6 ornament">When to call a professional</h2>
              <p className="font-body ink leading-relaxed mb-4">
                A Certified Separation Anxiety Trainer (CSAT) or veterinary behaviorist is worth the investment if:
              </p>
              <ul className="space-y-2 font-body ink-muted text-sm pl-5 list-disc">
                <li>Progress plateaus for more than two consecutive weeks</li>
                <li>New panic symptoms emerge (drooling, destruction, self-harm)</li>
                <li>He regresses below his current baseline for more than a few days</li>
                <li>You reach Week 12 and are still below the 45-minute mark</li>
              </ul>
              <p className="font-body ink-muted text-sm leading-relaxed mt-4">
                Many CSATs work remotely via Zoom. Given you're in Nairobi, this is likely the most viable route.
              </p>
            </div>
          </div>
        )}

        {/* EVENT DAY KIT */}
        {activeTab === 'wedding' && (
          <div className="space-y-6">
            <div className="paper deckle p-8">
              <h2 className="font-display text-3xl ink mb-4 ornament">Travel setup</h2>
              <p className="font-body ink leading-relaxed mb-4">
                Everything you train at home must transfer. Bring the sensory furniture of his routine with you, not just his food bowl.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {[
                  { h: 'His training mat', d: 'The specific one he has been settling on. Scent + texture + association.' },
                  { h: 'Two food puzzles', d: 'A Kong, a West Paw Toppl, or the LickiMat he knows. Bring two, filled and frozen the night before departure.' },
                  { h: 'White noise source', d: 'A small Bluetooth speaker and a pre-downloaded ambient track. Offline, in case WiFi is unreliable.' },
                  { h: 'Worn-recently t-shirt', d: 'Of yours. Slept in. Unwashed. Tucked on his mat while you are out.' },
                  { h: 'Familiar blanket', d: 'From his spot at home.' },
                  { h: 'Camera', d: 'A small indoor camera you can check from your phone. Wyze, Eufy, TP-Link Tapo all work on most international wifi.' },
                ].map((item, i) => (
                  <div key={i} className="border border-[#2d2a26]/15 p-4">
                    <div className="font-display text-lg ink mb-1">{item.h}</div>
                    <div className="font-body text-sm ink-muted leading-relaxed">{item.d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="paper deckle p-8">
              <h2 className="font-display text-3xl ink mb-4 ornament">The settle routine</h2>
              <p className="font-body ink leading-relaxed mb-4">
                Same sequence. Every time. Start using this by Week 9 and do not vary it.
              </p>
              <ol className="space-y-3 font-body ink">
                {[
                  'Twenty-minute decompression walk 45 minutes before planned departure. Sniffy, slow, not exhausting.',
                  'Small meal back at the accommodation. Not too full.',
                  'Fill frozen food puzzle, place on his mat.',
                  'Turn on white noise at low volume.',
                  'Dim lights slightly if daytime.',
                  'Place your worn shirt on the mat.',
                  'Leave without fanfare. No goodbye.',
                  'Return without fanfare. No excited greeting. Wait 60 seconds of calm before interacting.',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-display text-xl ink-accent flex-shrink-0">{i + 1}</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="paper deckle p-8">
              <h2 className="font-display text-3xl ink mb-4 ornament">Backup plans</h2>
              <div className="space-y-4 font-body ink">
                <p className="leading-relaxed">Even with a perfect program, the day has variables. Have fallbacks:</p>
                <div className="pl-4 border-l-2 border-[#8b3a2a] space-y-3">
                  <div>
                    <div className="font-display text-lg ink">A local dog sitter</div>
                    <div className="text-sm ink-muted leading-relaxed">Apps like Pawshake or Rover operate in most cities. Ask the Airbnb host for a local recommendation a few weeks ahead.</div>
                  </div>
                  <div>
                    <div className="font-display text-lg ink">A trusted guest or friend</div>
                    <div className="text-sm ink-muted leading-relaxed">If someone could check on him mid-absence, arrange that in advance. A 15-minute visit at the 2-hour mark can reset his internal clock.</div>
                  </div>
                  <div>
                    <div className="font-display text-lg ink">Vet check before travel</div>
                    <div className="text-sm ink-muted leading-relaxed">A specific conversation with your vet about whether a short-course anti-anxiety medication (fluoxetine, trazodone, or situational) might support the day. Even if you never use it, having a prescription in hand is reassurance.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-16 pt-8 border-t border-[#2d2a26]/20 font-body text-xs ink-muted text-center">
          Your progress is saved automatically in this browser. Close the tab and come back; nothing is lost.
        </footer>
      </div>
    </div>
  );
}
