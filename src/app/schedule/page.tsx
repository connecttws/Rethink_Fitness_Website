export const revalidate = 60;
import prisma from "@/lib/prisma";
import ScheduleClient from "./ScheduleClient";

const fallbackScheduleData = [
  { time: '06:00 AM', class: 'HIIT Burn', trainer: 'Sarah Jenkins', duration: '45 Min', spots: 5 },
  { time: '07:30 AM', class: 'Powerlifting', trainer: 'Marcus Vance', duration: '60 Min', spots: 2 },
  { time: '09:00 AM', class: 'Yoga Flow', trainer: 'David Chen', duration: '60 Min', spots: 12 },
  { time: '12:00 PM', class: 'Lunchtime Express', trainer: 'Sarah Jenkins', duration: '30 Min', spots: 8 },
  { time: '05:00 PM', class: 'CrossFit WOD', trainer: 'Marcus Vance', duration: '60 Min', spots: 0 },
  { time: '06:30 PM', class: 'Spin Class', trainer: 'Sarah Jenkins', duration: '45 Min', spots: 3 },
  { time: '08:00 PM', class: 'Mobility & Stretch', trainer: 'David Chen', duration: '30 Min', spots: 15 }
];

const fallbackClassDescriptions = [
  {
    name: 'HIIT Burn',
    intensity: 'High Intensity',
    description: 'A 45-minute high-intensity interval training session designed to torch calories and build cardiovascular endurance. Expect fast-paced rounds of burpees, sprints, and kettlebell swings.'
  },
  {
    name: 'Powerlifting',
    intensity: 'Advanced Strength',
    description: 'Focus exclusively on the big three: Squat, Bench, and Deadlift. Under expert coaching, you will refine your technique and safely increase your 1-rep max.'
  },
  {
    name: 'Yoga Flow',
    intensity: 'Low Impact / Recovery',
    description: 'A dynamic vinyasa flow focused on linking breath with movement. Perfect for active recovery, increasing flexibility, and building core strength.'
  },
  {
    name: 'CrossFit WOD',
    intensity: 'Extreme',
    description: 'The Workout of the Day. A constantly varied mix of gymnastics, weightlifting, and metabolic conditioning. Not for the faint of heart.'
  },
  {
    name: 'Mobility & Stretch',
    intensity: 'Beginner Friendly / Recovery',
    description: 'Dedicated time to release tight muscles, improve joint health, and prevent injury. Utilizing foam rollers, bands, and deep stretching techniques.'
  }
];

export default async function SchedulePage() {
  const pageData = await prisma.page.findFirst({ where: { slug: '/schedule' } });
  const content = (pageData?.content as any) || {};

  const fullScheduleData = content.fullScheduleData || fallbackScheduleData;
  const classDescriptions = content.classDescriptions || fallbackClassDescriptions;

  return (
    <ScheduleClient 
      fullScheduleData={fullScheduleData} 
      classDescriptions={classDescriptions} 
    />
  );
}


