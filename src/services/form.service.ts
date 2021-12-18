import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class FormService {

    constructor() {}

    public getGeneralInfoForm(): any {
      return {
          name: 'General Info',
          fields: [
              { model: 'name', type: 'string', label: 'Name of the Patient'},
              { model: 'age', type: 'number', label: 'Age' },
              { model: 'gender', type: 'dd', label: 'Gender', options: [ 'Male', 'Female' ] },
              { model: 'phone', type: 'number', label: 'Mobile Number' },
              { model: 'maritalstatus', type: 'dd', label: 'Marital Status', options: [ 'Married', 'Unmarried' ] },
              { model: 'canoperatesmartphone', type: 'dd',
                label: 'Can the patient operate the mobile (Smartphone)?', options: [ 'Yes', 'No' ] },
              { model: 'address', type: 'string', label: 'Address' },
              { model: 'govtissuedid', type: 'string', label: 'Aadhar No / Pan No / Driving License No' },
              { model: 'patientattender', type: 'string', label: 'Name of the patient attender & relationship with the patient (I)' },
              { model: 'patientattenderphone', type: 'number', label: 'Mobile Number of  attender' }
          ]
      };
    }

    public getHistoryForm(): any {
        return {
            name: 'History Info',
            fields: [
                { model: 'hypertension', type: 'dd', label: 'Hypertension', options: [ 'Yes', 'No' ] },
                { model: 'hypertensionsince', type: 'number', label: 'Since how many years' },
                { model: 'diabetes', type: 'dd', label: 'diabetes', options: [ 'Yes', 'No' ] },
                { model: 'diabetessince', type: 'number', label: 'Since how many years' },
                { model: 'diabetestablets', type: 'string', label: 'Tablets/Insulin' },
                { model: 'heartdisease', type: 'dd', label: 'Heartdisease', options: [ 'Yes', 'No' ] },
                { model: 'kidneydisease', type: 'dd', label: 'Kidneydisease', options: [ 'Yes', 'No' ] },
                { model: 'liverdisease', type: 'dd', label: 'Liverdisease', options: [ 'Yes', 'No' ] },
                { model: 'heartstroke', type: 'dd', label: 'Heart attack/stroke (Past 6months)', options: [ 'Yes', 'No' ] },
                { model: 'smoking', type: 'dd', label: 'Smoking', options: [ 'Yes', 'No' ] },
                { model: 'alcohol', type: 'dd', label: 'Alcohol', options: [ 'Yes', 'No' ] },
                { model: 'asthma', type: 'dd', label: 'Asthma', options: [ 'Yes', 'No' ] },
                { model: 'copd', type: 'dd', label: 'Copd', options: [ 'Yes', 'No' ] },
                { model: 'mallgnancy', type: 'dd', label: 'Mallgnancy(cancer)', options: [ 'Yes', 'No' ] },
                { model: 'transplant', type: 'dd', label: 'Recent Transplant', options: [ 'Yes', 'No' ] },
            ]
        };
      }

      public getVitalsForm(): any {
        return {
            name: 'Vitals Info',
            fields: [
              { model: 'bp', type: 'string', label: 'Bp' },
              { model: 'pr', type: 'string', label: 'PR(p)' },
              { model: 'temp', type: 'string', label: 'Temp' },
              { model: 'spo2', type: 'string', label: 'Spo2' },
              { model: 'respiratoryrate', type: 'string', label: 'Respiratory rate(R)' },
              { model: 'singlebreathcount', type: 'string', label: 'single breath count(S)' },
              { model: 'weight', type: 'number', label: 'Weight' },
              { model: 'recentweightloss', type: 'dd', label: 'Any History of Recent Weight Loss', options: [ 'Yes', 'No' ] },
              { model: 'weightlossquestion', type: 'string', label: 'question' },
              { model: 'grbs', type: 'dd', label: 'GRBS', options: [ 'Yes', 'No' ] },
              { model: 'grbsquestion', type: 'string', label: 'question' },
            ]
        };
      }

      public getSymptomsForm(): any {
        return {
            name: 'Symptoms Info',
            fields: [
              { model: 'chestpain', type: 'dd', label: 'Chest pain', options: [ 'Yes', 'No' ] },
              { model: 'bodypain', type: 'dd', label: 'Body pain', options: [ 'Yes', 'No' ] },
              { model: 'breathingdifficulty', type: 'dd', label: 'Breathingdifficulty', options: [ 'Yes', 'No' ] },
              { model: 'unconscious', type: 'dd', label: 'Unconscious/ drowsy', options: [ 'Yes', 'No' ] },
              { model: 'familyaffectedwithcovid', type: 'string', label: 'Anyone in the immediate family affected with Covid 19?' },
              { model: 'caregiver', type: 'string', label: 'Are you the care giver for that person ? Or did you have close contact with that person?' },
              { model: 'pastillness', type: 'string', label: 'Past history of medical illness' },
              { model: 'anysurgerie', type: 'string', label: 'Any surgeries or other medical procedures' },
              { model: 'noofchildren', type: 'number', label: 'For woman who are married - No of Children' },
              { model: 'ageofchildren', type: 'number', label: 'Age of Children' },
             ]
        };
      }

      public getMoreForm(): any {
        return {
            name: 'More Info',
            fields: [
              { model: 'symptoms', type: 'string', label: 'Describe your symptoms' },
              { model: 'currentmedications ', type: 'string', label: 'Current Medications - Please list all along with dosage:' },
              { model: 'drugallerigies', type: 'string', label: 'Any drug allergies, please mention:' },
              { model: 'prescription', type: 'string', label: 'List of reports sent- Please send the latest prescription and reports:' },
              { model: 'covidtest', type: 'dd', label: 'Covid-19 test done or not?', options: [ 'Yes', 'No' ] },
              { model: 'nearhospitals', type: 'string', label: 'Any nearby PHC/ Sec.hosp/ Private hospitals and how far it is from your home (U)' },
              { model: 'bloodgroup', type: 'dd', label: 'Blood group of the patient', options: [ 'A+', 'O+','B+','AB+','A-','O-','B-','AB-' ] },
              ]
        };
      }
}
