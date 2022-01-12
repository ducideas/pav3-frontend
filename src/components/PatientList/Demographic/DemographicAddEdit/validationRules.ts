export default {
    FirstName: {
        required: true,
        maxLength: 50,
        format:/^[A-Za-z]+$/
    },
    LastName: {
        required: true,
        maxLength: 50,
        format:/^[A-Za-z]+$/
    },
    DOB: {
        required: true,
        notIntheFuture: true
    },
    Gender: {
        required: true,
    },
    Email: {
        required: true,
        maxLength: 35,
        format: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    },
    PhoneNumber: {
        required: true,
        format: /^\(\d{3}\) \d{3}-\d{4}$/
    },
    Address: {
        required: true,
        maxLength: 100,
    },
    City: {
        required: true,
        maxLength: 100,
    },
};