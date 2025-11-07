type Role = {
    id: number;
    name: 'lecturer' | 'student' | 'admin';
};

type userInput = {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}
type courseInput = {
    id?: number;
    name: string;
    description: string;
    phase: string;
    credits: number;
}
type lecturerInput = {
    id?: number;
    expertise: string;
    user: userInput;
    courses: courseInput[];
}
type studentInput = {
    id?: number;
    studentnumber: string;
    user: userInput;
}
type scheduleInput = {
    id?: number;
    start: Date;
    end: Date;
    course: courseInput;
    lecturer: lecturerInput;
    student: studentInput[];
}
type enrollmentInput = {
    schedule: scheduleInput;
    students: studentInput[]
}
type authenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
}
export {
    Role,
    userInput,
    courseInput,
    lecturerInput,
    scheduleInput,
    studentInput,
    enrollmentInput,
    authenticationResponse,
};