export function bookingMessage({lang,care,therapist,when,time,name}: {lang:string;care:string;therapist:string;when:string;time:string;name:string}) {
 const fr=lang==='fr';
 const date=/^\d{4}-\d{2}-\d{2}$/.test(when)?when.split('-').reverse().join('/'):when;
 return [fr?'Bonjour PhysioVerbier, je souhaite prendre rendez-vous.':'Hello PhysioVerbier, I would like to book an appointment.', '', `${fr?'Soin':'Service'} : ${care}`, therapist?`${fr?'Thérapeute souhaité':'Preferred therapist'} : ${therapist}`:'', `${fr?'Disponibilité':'Availability'} : ${date || (fr?'À convenir':'To be arranged')} — ${time}`, name.trim()?`${fr?'Prénom':'First name'} : ${name.trim()}`:'', '',fr?'Quelles sont vos disponibilités ? Merci !':'What appointments do you have available? Thank you!'].filter((line,i,all)=>line!=='' || (i>0 && all[i-1]!=='')).join('\n');
}
