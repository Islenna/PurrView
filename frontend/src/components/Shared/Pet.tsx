export type Pet = {
    _id: string;
    owner: string; 
    name: string;
    species: 'Dog' | 'Cat';
    breed: string;
    ageYear: number;
    ageMonth: number;
    sex: 'Male' | 'Female' | 'Neutered' | 'Spayed' | 'Unknown';
};