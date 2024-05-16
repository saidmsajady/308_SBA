// The provided course information.
const courseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const assignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };

  // The provided learner submission data.
  const learnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

  /* 
  Trying to get this Output! 
- Grade for Assignment 1
- Grade for Assignment 2
- ID number for Stidemt
- Total Average of two assignments
  [
    { '1': 0.94, '2': 1, id: 125, avg: 0.985 },
    { '1': 0.78, '2': 0.833, id: 132, avg: 0.82 }
  ]
  */

  /*
What to Print Out
  - Print out the student ID number ( either 125 or 135 )
  - Assignment name and score for each assignment.
  - Average score for all Assignments per student
 
Assumptions
  - do not include assignments that are not yet due ( assignment 3 ( try/catch? ))
  - if there is a mismatch course_id, throw an error (try/catch)
  - if an assignment was turned in 10 minutes late, deduct 10% additional to their score
  - Additional Errors - What if points_possible is 0? You cannot divide by zero. 
  - Additional Errors - What if a value that you are expecting to be a number is instead a string? 
*/

  function studentID(submissions) {
    const studentIDs = [];

    for ( let i = 0; i < submissions.length; i++ ) {
      const submission = submissions[i];
      let found = false;

      for ( let j = 0; j < studentIDs.length; j++ ) {
        if (studentIDs[j] === submission.learner_id) {
          found = true;
          break;
        }
      }
      if (!found) {
        studentIDs.push(submission.learner_id);
      }
    }
    return studentIDs;
  }

  function assignmentNumnAndScore(submissions, assignments) {
    for ( let i = 0; i < submissions.length; i++ ) {
      const submission = submissions[i];
      const assignment = assignments.find(function(a) {
        return a.id === submission.assignment_id;
      });

      if ( assignment && new Date(submission.submission.submitted_at) <= new Date(assignment.due_at)) {
        let score = submission.submission.score;
        const dueDate = new Date(assignment.due_at);
        const submittedDate = new Date(submission.submission.submitted_at);
        const timeDiff = submittedDate - dueDate;

        if (timeDiff > 0 && timeDiff <= 600000) {
          score *= 0.9;
        }

        const scorePercentage = score / assignment.points_possible;

        if (!studentData[submission.learner_id]) {
          studentData[submission.learner_id] = {};
        }

        studentData[submission.learner_id][submission.assignment_id] = scorePercentage;
      }
    }
    return studentData;
  } 

  function averageScore(studentData, assignmentGroup) {
    const averages = [];

    for (const studentID in studentData) {
      if (studentData.hasOwnProperty(studentID)) {
        let totalPoints = 0;
        let weightedSum = 0;
        const assignmentScores = studentData[studentID];

        for (const assignmentID in assignmentScores) {
          if (assignmentScores.hasOwnProperty(assignmentID)) {
            const assignment = assignmentGroup.assignments.find(function(a) {
            return a.id === parseInt(assignmentID);
            });

            const weight = assignment.points_possible * assignmentGroup.group_weight / 100;
            totalPoints += weight;
            weightedSum += assignmentScores[assignmentID] * weight;
          }
        }

        const avg = weightedSum / totalPoints;
          averages.push({ id: parseInt(studentID), avg, ...assignmentScores });
      }
    }
    return averages;
  }

  
  function getLearnerData(studentID, assignmentNumnAndScore, averageScore) {

    studentID();
    assignmentNumnAndScore();
    averageScore();

    return studentID, assignmentNumnAndScore, averageScore;
  }

//const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
//console.log(result);

