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

// This function is gonna calculate the assignment scores
function calculateAssignmentScores(submissions, assignments) {
  const studentData = {};

  for (const submission of submissions) {
    const assignment = assignments.find(a => a.id === submission.assignment_id);

    if (assignment) {
      const dueDate = new Date(assignment.due_at);
      const today = new Date(new Date().setDate(new Date().getDate() - 1));

      // Only consider assignments with due dates before today
      if (dueDate <= today) {
        const score = submission.submission.score;
        const submittedDate = new Date(submission.submission.submitted_at);

        // Check for late submissions and apply a 10% penalty if necessary
        const lateSubmissionPenalty = submittedDate > dueDate ? 0.9 : 1;

        // Calculate the score percentage
        const scorePercentage = score * lateSubmissionPenalty / assignment.points_possible;

        // Store the score percentage for the student and assignment
        if (!studentData[submission.learner_id]) {
          studentData[submission.learner_id] = { id: submission.learner_id };
        }
        studentData[submission.learner_id][submission.assignment_id] = scorePercentage;
      }
    }
  }
  
  return studentData;
}

// This function calculates the average scores for each student
function calculateAverageScores(studentData, assignmentGroup) {
  const averages = [];

  // This loops through each student 
  for (const studentID in studentData) {
    if (studentData.hasOwnProperty(studentID)) {
      const assignmentScores = studentData[studentID];
      let totalPoints = 0;
      let weightedSum = 0;

      // now looping assignments for current student
      for (const assignmentID in assignmentScores) {
        if (assignmentScores.hasOwnProperty(assignmentID)) {
          const assignment = assignmentGroup.assignments.find(a => a.id === parseInt(assignmentID));

          // once found, calculates the weight and add it to the total
          if (assignment) {
            const weight = assignment.points_possible * assignmentGroup.group_weight / 100;
            totalPoints += weight;
            weightedSum += assignmentScores[assignmentID] * weight;
          } else {
            continue;
          }
        }
      }

      // Calculate average score
      if (totalPoints > 0) {
        const avg = weightedSum / totalPoints;
        averages.push({ ...studentData[studentID], avg });
      }
    }
  }
  
  return averages;
}

// Gets the learner data
function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
  let result;
  
  try {
    // Validate the assignment group belongs to the provided course
    if (courseInfo.id !== assignmentGroup.course_id) {
      throw new Error("Invalid input: Assignment group does not belong to the provided course.");
    }

    // Calculate assignment scores and average scores
    const assignmentScores = calculateAssignmentScores(learnerSubmissions, assignmentGroup.assignments);
    const avgScores = calculateAverageScores(assignmentScores, assignmentGroup);
    result = avgScores;
  } catch (error) {
    result = error.message;
  }

  return result;
}

// Print the result
const result = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
console.log(result);