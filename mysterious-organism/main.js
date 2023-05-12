// Array containing all the pAequors
const allPaequor = [];

// Array containing top 30 the pAequors
const top30Paequor = [];

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// Check if pAequor already exists
const pAequorFinder = specimenNum => {
  const pAequorIndex = allPaequor.findIndex( obj => obj.specimenNum === specimenNum); 
  return pAequorIndex;
};

// Generate a unique ramdom Specimen Number
const uniqueSpecimen = () =>{ 
  let specimenNum;
  do {
    specimenNum = Math.floor(Math.random() * 1000000); 
  } while (pAequorFinder(specimenNum)!== -1);
  return specimenNum;
};  

// Generate a unique base
const uniqueBase = (currentBase) =>{   
  let newBase;
  do {
    newBase = returnRandBase(); 
  } while (newBase === currentBase);
  return newBase;
}; 

// Generate 30 pAequor that will likely survive
const top30Creator = () => {
  const newpAequor = {} 
  while(top30Paequor.length < 30){
    const newpAequor = pAequorFactory();
    if(newpAequor.willLikelySurvive()){
      top30Paequor.push(newpAequor);
    }
  }
  return top30Paequor
};

// Factory Function to create new pAequor
const pAequorFactory = () => {
  let specimen = uniqueSpecimen();
  let strand = mockUpStrand();
  const newpAequor = { 
    specimenNum: specimen,
    dna: strand,
    mutate() { 
      let i = Math.floor(Math.random() * 15);  
      this.dna[i] = uniqueBase(this.dna[i]);    
    },
    compareDNA(pAequortoCompare) {
      let i = 0;
      this.dna.forEach((item1,index1) => {
        pAequortoCompare.dna.forEach((item2,index2) => {
           item1 === item2 && index1 === index2 ? i++ : null;
        }); 
      }); 
      let DNApercentage = Math.floor((i / 15) * 100)
      return "specimen #1 and specimen #2 have " + DNApercentage + "% DNA in common";     
    },
    willLikelySurvive() {
      let i = 0;
      this.dna.forEach(element => {
        element === "C" || element ===  "G" ? i++ : null;      
    }); 
      let CG_percentage = Math.floor((i / 15) * 100); 
      return CG_percentage >= 60;
    }   
  }; 
  allPaequor.push(newpAequor);  
  return newpAequor;
};
 
 
//console.log(allPaequor); 
console.log(allPaequor.length + " " + top30Paequor.length); 
console.log(top30Creator())
console.log(allPaequor.length + " " + top30Paequor.length); 
