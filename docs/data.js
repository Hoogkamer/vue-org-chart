var INPUT_DATA = {
    "chart": [{
        "id": "1",
        "name": "Software BV",
        "description": "",
        "parent_id": "",
        "staff_department": "N",
        "manager_id": "B01"
    }, {
        "id": "2",
        "name": "Office",
        "description": "",
        "parent_id": "1",
        "staff_department": "Y",
        "manager_id": "B01"
    }, {
        "id": "01268004-f249-5d93-41e4-c23947f11a62",
        "name": "team 0",
        "description": "",
        "parent_id": "2",
        "staff_department": "N",
        "manager_id": "B04"
    }, {
        "id": "a798e6cf-0b58-067e-44ef-237f3b3b253a",
        "name": "team 1",
        "description": "",
        "parent_id": "2",
        "staff_department": "N"
    }, {
        "id": "3",
        "name": "Communication",
        "description": "",
        "parent_id": "1",
        "staff_department": "Y",
        "manager_id": "B02"
    }, {
        "id": "2b5f3900-b816-b42a-f272-b9ae0ca0ab83",
        "name": "comteam1",
        "description": "",
        "parent_id": "3",
        "staff_department": "N",
        "manager_id": ""
    }, {
        "id": "4",
        "name": "Strategy & Sustainability",
        "description": "",
        "parent_id": "1",
        "staff_department": "Y",
        "manager_id": "B01"
    }, {
        "id": "5",
        "name": "Desktop Development",
        "description": "",
        "parent_id": "1",
        "staff_department": "N",
        "manager_id": "B01"
    }, {
        "id": "5_1",
        "name": "Business customers",
        "description": "",
        "parent_id": "5",
        "staff_department": "N",
        "manager_id": "B02"
    }, {
        "id": "5_1_0",
        "name": "Business Office",
        "description": "",
        "parent_id": "5_1",
        "staff_department": "Y",
        "manager_id": "B05"
    }, {
        "id": "5_1_1",
        "name": "Front end team",
        "description": "",
        "parent_id": "5_1",
        "staff_department": "N",
        "manager_id": "B02"
    }, {
        "id": "5_1_2",
        "name": "Back end team",
        "description": "",
        "parent_id": "5_1",
        "staff_department": "N",
        "manager_id": "B05"
    }, {
        "id": "5_1_3",
        "name": "Api team",
        "description": "",
        "parent_id": "5_1",
        "staff_department": "N",
        "manager_id": "B02"
    }, {
        "id": "5_2",
        "name": "Private Customer",
        "description": "",
        "parent_id": "5",
        "staff_department": "N",
        "manager_id": "B02"
    }, {
        "id": "6",
        "name": "Mobile Development",
        "description": "",
        "parent_id": "1",
        "staff_department": "N",
        "manager_id": "B05"
    }, {
        "id": "6_1",
        "name": "Android",
        "description": "",
        "parent_id": "6",
        "staff_department": "N",
        "manager_id": "B04"
    }, {
        "id": "6_2",
        "name": "IOS",
        "description": "The IOS department creates and maintains applications for Apple phones and tablets",
        "parent_id": "6",
        "staff_department": "N",
        "manager_id": "B02"
    }, {
        "id": "6_3",
        "name": "Other",
        "description": "",
        "parent_id": "6",
        "staff_department": "N",
        "manager_id": "B02"
    }, {
        "id": "7",
        "name": "Web Development",
        "description": "",
        "parent_id": "1",
        "staff_department": "N",
        "manager_id": "B05"
    }, {
        "id": "7_1",
        "name": "IE troubleshooters",
        "description": "",
        "parent_id": "7",
        "staff_department": "N",
        "manager_id": "B05"
    }, {
        "id": "7_2",
        "name": "Javascript kiddies",
        "description": "",
        "parent_id": "7",
        "staff_department": "N",
        "manager_id": "B04"
    }, {
        "id": "7_3",
        "name": "Java masters",
        "description": "",
        "parent_id": "7",
        "staff_department": "N",
        "manager_id": "B05"
    }, {
        "id": "7_4",
        "name": "PHP people",
        "description": "",
        "parent_id": "7",
        "staff_department": "N",
        "manager_id": "B04"
    }, {
        "id": "9",
        "name": "Finance",
        "description": "",
        "parent_id": "1",
        "staff_department": "N",
        "manager_id": "B03"
    }, {
        "id": "9_1",
        "name": "Payments",
        "description": "",
        "parent_id": "9",
        "staff_department": "N",
        "manager_id": "B04"
    }, {
        "id": "9_2",
        "name": "Invoices",
        "description": "",
        "parent_id": "9",
        "staff_department": "N",
        "manager_id": "B04"
    }, {
        "id": "9_3",
        "name": "Incasso",
        "description": "",
        "parent_id": "9",
        "staff_department": "N",
        "manager_id": "B03"
    }, {
        "id": "10",
        "name": "Risk Management",
        "description": "",
        "parent_id": "1",
        "staff_department": "N",
        "manager_id": "B05"
    }, {
        "id": "10_1",
        "name": "Central Risk Management",
        "description": "",
        "parent_id": "10",
        "staff_department": "N",
        "manager_id": "B04"
    }, {
        "id": "10_6",
        "name": "Operational Risk Management & Control",
        "description": "",
        "parent_id": "10",
        "staff_department": "N",
        "manager_id": "B05"
    }, {
        "id": "11",
        "name": "Innovation & Technology",
        "description": "",
        "parent_id": "1",
        "staff_department": "N",
        "manager_id": "B04"
    }, {
        "id": "11_1",
        "name": "Innovation",
        "description": "",
        "parent_id": "11",
        "staff_department": "N",
        "manager_id": "B03"
    }, {
        "id": "11_2",
        "name": "Technology",
        "description": "",
        "parent_id": "11",
        "staff_department": "N",
        "manager_id": "B03"
    }, {
        "id": "12",
        "name": "Human Resources",
        "description": "",
        "parent_id": "1",
        "staff_department": "N",
        "manager_id": "B05"
    }, {
        "id": "12_1",
        "name": "Transformation Team",
        "description": "",
        "parent_id": "12",
        "staff_department": "N",
        "manager_id": "B03"
    }, {
        "id": "12_2",
        "name": "Branding & Communications",
        "description": "",
        "parent_id": "12",
        "staff_department": "N",
        "manager_id": "B03"
    }],
    "people": [{
        "id": "B01",
        "name": "Big Boss",
        "photo": "B01",
        "main_role": ""
    }, {
        "id": "B03",
        "name": "Mo Ney",
        "photo": "B03",
        "main_role": ""
    }, {
        "id": "B02",
        "name": "S. Talker",
        "photo": "B02",
        "main_role": ""
    }, {
        "id": "df",
        "name": "Big Boss1",
        "photo": "",
        "main_role": ""
    }, {
        "id": "B05",
        "name": "Mr x",
        "photo": "B05",
        "main_role": ""
    }, {
        "id": "B04",
        "name": "Mr y",
        "photo": "B04",
        "main_role": ""
    }, {
        "name": "michael",
        "function": "web",
        "id": "44",
        "photo": ""
    }],
    "assignments": [{
        "department_id": "6_2",
        "person_id": "B02",
        "role": "senior developer",
        "id": "63f6e85e-8fde-6def-8493-fbdc9c87ccc0"
    }, {
        "department_id": "6_2",
        "person_id": "B05",
        "role": "ux/ui designer",
        "id": "e368c34b-5757-aa79-8b46-f62ee7f2efff"
    }, {
        "department_id": "6_2",
        "person_id": "B03",
        "role": "scrum master",
        "id": "c82985b7-f072-7b17-9f2a-6807a162fb51"
    }, {
        "department_id": "6_2",
        "id": "fa8c7d6d-c5c8-0971-b601-cfabf3c52a73",
        "person_id": "B02",
        "role": "tester"
    }, {
        "department_id": "6_2",
        "id": "b3396496-8f88-734b-c294-729d78fac976",
        "person_id": "B04",
        "role": "new tester"
    }, {
        "department_id": "6_2",
        "id": "6482c26b-de9f-21a1-7a47-3597fd6ca37a",
        "person_id": "44",
        "role": "tester"
    }, {
        "department_id": "6_2",
        "id": "d3439065-109b-8999-6255-1384b7bc0942",
        "person_id": "B01",
        "role": "strategy consultant"
    }]
}