import { useEffect, useState } from "react";
import "./App.css";
import ReminderList from "./components/ReminderList";
import Reminder from './models/reminder'
import ReminderService from "./services/reminder"
import NewReminder from "./components/NewReminder";




function App() {

  const [reminders, setReminders] = useState<Reminder[]>([]);
  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const reminders = await ReminderService.getReminders();
    setReminders(reminders);
  }

  const removeReminder = (id: number) => {
    const response = reminders.filter(reminder => reminder.id !== id);
    setReminders(response)
  }

  const addReminder =async (title: string) => {
    const response = await ReminderService.addReminders(title);
    setReminders([response,...reminders])
  }

  return (
    <div className="App">
      <NewReminder onAddReminder={ addReminder} />
      <ReminderList items={reminders } onRemoveReminder={removeReminder}/>
    </div>
  );
}

export default App;
