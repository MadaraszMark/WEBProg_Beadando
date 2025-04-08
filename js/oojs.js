// Alaposztály
class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  
    getInfo() {
      return `${this.name}, ${this.age} éves`;
    }
  }
  
  // Leszármazott osztály
  class Student extends Person {
    constructor(name, age, school, grade) {
      super(name, age);
      this.school = school;
      this.grade = grade;
    }
  
    getInfo() {
      return `${super.getInfo()} – ${this.school} (${this.grade})`;
    }
  }
  
  // DOM elemek
  const charactersDiv = document.getElementById("characters");
  const generateBtn = document.getElementById("generate");
  
  // Példák generálása
  const exampleNames = ["Anna", "Bence", "Csilla", "Dani", "Eszter"];
  const schools = ["GAMF", "BME", "SZTE", "DE", "ELTE"];
  const grades = ["5.0", "4.5", "3.8", "4.0", "4.9"];
  
  // Gomb esemény
  generateBtn.addEventListener("click", () => {
    const randomName = exampleNames[Math.floor(Math.random() * exampleNames.length)];
    const randomAge = Math.floor(Math.random() * 10) + 18;
    const randomSchool = schools[Math.floor(Math.random() * schools.length)];
    const randomGrade = grades[Math.floor(Math.random() * grades.length)];
  
    const student = new Student(randomName, randomAge, randomSchool, randomGrade);
  
    const p = document.createElement("p");
    p.textContent = student.getInfo();
    p.style.padding = "8px";
    p.style.background = "#f0f0f0";
    p.style.marginBottom = "10px";
    p.style.borderLeft = "4px solid #007bff";
  
    document.body.appendChild(p);
  });
  