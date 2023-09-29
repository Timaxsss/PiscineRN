export interface Employee {
    id: number;
    email: string;
    name: string;
    surname: string;
}

export interface EmployeeDetails {
    id: number;
    email: string;
    name: string;
    surname: string;
    birth_date: string;
    gender: string;
    work: string;
    subordinates: any[];
}

export interface LoginResponse {
    access_token?: string;
    detail?: string;
}
