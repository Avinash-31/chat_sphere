export function GetSender(loggedUser, users) {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
}

export function GetSenderData(loggedUser, users) {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
}
