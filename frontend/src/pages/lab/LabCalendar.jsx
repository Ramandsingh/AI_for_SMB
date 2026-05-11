import { useState } from 'react';
import { Calendar, Badge, Modal, Form, Input, TimePicker, Button, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import { Plus, Download, Trash2, Edit2, CalendarDays } from 'lucide-react';

function makeId() { return Math.random().toString(36).slice(2, 9); }

const SEED_EVENTS = [
  { id: makeId(), date: dayjs().format('YYYY-MM-DD'), title: 'AI Strategy Review', time: '09:00', duration: 60, desc: 'Board-level AI program review — quarterly cadence' },
  { id: makeId(), date: dayjs().add(2, 'day').format('YYYY-MM-DD'), title: 'Copilot Pilot Kickoff', time: '14:00', duration: 90, desc: 'Launch meeting for M365 Copilot pilot with Finance team' },
  { id: makeId(), date: dayjs().add(5, 'day').format('YYYY-MM-DD'), title: 'ML Model Review', time: '11:00', duration: 45, desc: 'Monthly model performance and drift review' },
  { id: makeId(), date: dayjs().add(7, 'day').format('YYYY-MM-DD'), title: 'AI Governance Workshop', time: '10:00', duration: 120, desc: 'Policy framework workshop with legal and compliance' },
  { id: makeId(), date: dayjs().add(12, 'day').format('YYYY-MM-DD'), title: 'Vendor Demo: Azure AI Foundry', time: '15:00', duration: 60, desc: 'Microsoft solution team presenting AI Foundry capabilities' },
  { id: makeId(), date: dayjs().add(14, 'day').format('YYYY-MM-DD'), title: 'AI Literacy Training (Cohort 2)', time: '09:30', duration: 180, desc: 'Half-day AI literacy program for manager cohort' },
  { id: makeId(), date: dayjs().add(14, 'day').format('YYYY-MM-DD'), title: 'ROI Report Due', time: '17:00', duration: 30, desc: 'Q2 AI program ROI report to CFO' },
  { id: makeId(), date: dayjs().add(21, 'day').format('YYYY-MM-DD'), title: 'Anthropic Partnership Call', time: '13:00', duration: 60, desc: 'Quarterly check-in on Claude API usage and roadmap' },
];

function toICS(event) {
  const dt = dayjs(`${event.date} ${event.time}`, 'YYYY-MM-DD HH:mm');
  const dtEnd = dt.add(event.duration, 'minute');
  const fmt = d => d.format('YYYYMMDDTHHmm00');
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AI Dashboard//EN',
    'BEGIN:VEVENT',
    `UID:${event.id}@ai-dashboard`,
    `DTSTART:${fmt(dt)}`,
    `DTEND:${fmt(dtEnd)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.desc || ''}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
}

function downloadICS(event) {
  const blob = new Blob([toICS(event)], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `${event.title.replace(/\s+/g, '_')}.ics`; a.click();
  URL.revokeObjectURL(url);
}

function downloadAllICS(events) {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AI Dashboard//EN'];
  events.forEach(e => {
    const dt = dayjs(`${e.date} ${e.time}`, 'YYYY-MM-DD HH:mm');
    const dtEnd = dt.add(e.duration, 'minute');
    const fmt = d => d.format('YYYYMMDDTHHmm00');
    lines.push('BEGIN:VEVENT', `UID:${e.id}@ai-dashboard`, `DTSTART:${fmt(dt)}`, `DTEND:${fmt(dtEnd)}`, `SUMMARY:${e.title}`, `DESCRIPTION:${e.desc || ''}`, 'END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'ai_calendar.ics'; a.click();
  URL.revokeObjectURL(url);
}

export default function LabCalendar() {
  const [events, setEvents] = useState(SEED_EVENTS);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const eventsOnDate = d => events.filter(e => e.date === d);
  const dayEvents = eventsOnDate(selectedDate);

  function openNew() {
    setEditing(null);
    form.setFieldsValue({ title: '', time: dayjs('09:00', 'HH:mm'), duration: 60, desc: '' });
    setModal(true);
  }

  function openEdit(ev) {
    setEditing(ev);
    form.setFieldsValue({ title: ev.title, time: dayjs(ev.time, 'HH:mm'), duration: ev.duration, desc: ev.desc });
    setModal(true);
  }

  function handleSave() {
    form.validateFields().then(vals => {
      const record = {
        id: editing?.id || makeId(),
        date: selectedDate,
        title: vals.title,
        time: vals.time.format('HH:mm'),
        duration: Number(vals.duration) || 60,
        desc: vals.desc || '',
      };
      if (editing) {
        setEvents(es => es.map(e => e.id === editing.id ? record : e));
      } else {
        setEvents(es => [...es, record]);
      }
      setModal(false);
    });
  }

  function deleteEvent(id) { setEvents(es => es.filter(e => e.id !== id)); }

  function dateCellRender(date) {
    const evs = eventsOnDate(date.format('YYYY-MM-DD'));
    return evs.length > 0 ? (
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {evs.slice(0, 2).map(e => (
          <li key={e.id}><Badge color="#2563eb" text={<span style={{ fontSize: 10 }}>{e.title}</span>} /></li>
        ))}
        {evs.length > 2 && <li><span style={{ fontSize: 10, color: '#94a3b8' }}>+{evs.length - 2} more</span></li>}
      </ul>
    ) : null;
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#2563eb', borderRadius: 8 } }}>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">
            <a href="https://ant.design/components/calendar" target="_blank" rel="noopener noreferrer" className="hover:underline">antd · Calendar</a> · dayjs · .ics export
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mb-1">AI Calendar</h1>
        <p className="text-slate-500 text-sm mb-5">Ant Design Calendar with CRUD events and .ics download. Click a date to manage events for that day.</p>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{events.length} events</span> — click any date to add/edit
          </p>
          <div className="flex gap-2">
            <button onClick={() => downloadAllICS(events)} className="btn-ghost text-xs">
              <Download size={13} /> Export all .ics
            </button>
            <button onClick={openNew} className="btn-primary text-xs">
              <Plus size={13} /> Add event
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="card p-0 overflow-hidden mb-4" style={{ borderRadius: 12 }}>
          <Calendar
            cellRender={dateCellRender}
            onSelect={d => setSelectedDate(d.format('YYYY-MM-DD'))}
            style={{ padding: '12px 16px' }}
          />
        </div>

        {/* Day panel */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="text-blue-600" />
              <p className="font-bold text-slate-800">{dayjs(selectedDate).format('dddd, D MMMM YYYY')}</p>
            </div>
            <button onClick={openNew} className="btn-primary text-xs py-1.5">
              <Plus size={12} /> Add
            </button>
          </div>

          {dayEvents.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">No events — click Add to create one</p>
          ) : (
            <div className="space-y-2">
              {dayEvents.sort((a,b) => a.time.localeCompare(b.time)).map(ev => (
                <div key={ev.id} className="flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5">
                  <div className="text-center flex-shrink-0">
                    <p className="text-xs font-bold text-blue-700">{ev.time}</p>
                    <p className="text-xs text-slate-400">{ev.duration}m</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{ev.title}</p>
                    {ev.desc && <p className="text-xs text-slate-500 truncate">{ev.desc}</p>}
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={() => downloadICS(ev)} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer" title="Download .ics">
                      <Download size={13} />
                    </button>
                    <button onClick={() => openEdit(ev)} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer" title="Edit">
                      <Edit2 size={13} />
                    </button>
                    <button onClick={() => deleteEvent(ev.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors cursor-pointer" title="Delete">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        <Modal
          title={editing ? 'Edit event' : `New event — ${dayjs(selectedDate).format('D MMM')}`}
          open={modal}
          onOk={handleSave}
          onCancel={() => setModal(false)}
          okText="Save"
          okButtonProps={{ style: { background: '#2563eb', borderColor: '#2563eb' } }}
        >
          <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
            <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Title required' }]}>
              <Input placeholder="e.g. AI Governance Workshop" />
            </Form.Item>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Form.Item label="Start time" name="time" rules={[{ required: true }]}>
                <TimePicker format="HH:mm" minuteStep={15} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="Duration (min)" name="duration">
                <Input type="number" min={15} step={15} placeholder="60" />
              </Form.Item>
            </div>
            <Form.Item label="Description" name="desc">
              <Input.TextArea rows={2} placeholder="Optional notes…" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ConfigProvider>
  );
}
