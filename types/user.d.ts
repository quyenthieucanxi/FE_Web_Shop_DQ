

interface User {
    id?: string;
    email?: string;
    fullName?: string;
    phoneNumber?: string;
    address?: string;
    introduce?: string;
    gender?: string;
    dob?: Date;
    url?: string;
    avatarUrl?: string;
    isActive?: boolean;
    followedCount? : number;
    followingCount? : number;
} 

interface UserList {
    totalUser: number;
    userList : List<User> ;
}