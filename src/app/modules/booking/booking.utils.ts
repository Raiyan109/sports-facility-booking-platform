import { TSchedule } from "./booking.interface";

export const hasTimeConflict = (timeSchedules: TSchedule[], newTimeSchedule: TSchedule) => {
    for (const schedule of timeSchedules) {
        const existingStartTime = new Date(`${schedule.date}T${schedule.startTime}`);
        const existingEndTime = new Date(`${schedule.date}T${schedule.endTime}`);
        const newStartTime = new Date(`${newTimeSchedule.date}T${newTimeSchedule.startTime}`);
        const newEndTime = new Date(`${newTimeSchedule.date}T${newTimeSchedule.endTime}`);

        // 10:30 - 12:30
        // 11:30 - 1.30
        if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
            return true;
        }
    }

    return false;
}