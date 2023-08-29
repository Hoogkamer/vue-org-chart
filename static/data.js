var INPUT_DATA = {
    "api_version": "2.0",
    "chart": {
        "id": "1",
        "name": "Voorzitter",
        "description": "",
        "parent_id": "",
        "staff_department": "N",
        "manager_id": "VZ",
        "dataFields": [{
            "name": "Location",
            "value": "",
            "type": "text"
        }],
        "children": [{
            "id": "2",
            "name": "Vertrouwenspersoon",
            "description": "description vertouwenspersoon",
            "parent_id": "1",
            "staff_department": "Y",
            "manager_id": "VZ",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [],
            "showChildren": true
        }, {
            "id": "3",
            "name": "Communication",
            "description": "",
            "parent_id": "1",
            "staff_department": "Y",
            "manager_id": "B01",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [{
                "id": "2b5f3900-b816-b42a-f272-b9ae0ca0ab83",
                "name": "comteam1",
                "description": "",
                "parent_id": "3",
                "staff_department": "N",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }],
            "showChildren": false
        }, {
            "id": "4",
            "name": "Strategy & Sustainability",
            "description": "",
            "parent_id": "1",
            "staff_department": "Y",
            "manager_id": "B01",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [],
            "showChildren": false
        }, {
            "id": "5",
            "name": "Desktop Development",
            "description": "",
            "parent_id": "1",
            "staff_department": "N",
            "manager_id": "B01",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [{
                "id": "5_1",
                "name": "Business customers",
                "description": "",
                "parent_id": "5",
                "staff_department": "N",
                "manager_id": "B02",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [{
                    "id": "5_1_0",
                    "name": "Business Office",
                    "description": "",
                    "parent_id": "5_1",
                    "staff_department": "Y",
                    "manager_id": "B05",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                }, {
                    "id": "5_1_1",
                    "name": "Front end team",
                    "description": "",
                    "parent_id": "5_1",
                    "staff_department": "N",
                    "manager_id": "B02",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                }, {
                    "id": "5_1_2",
                    "name": "Back end team",
                    "description": "",
                    "parent_id": "5_1",
                    "staff_department": "N",
                    "manager_id": "B05",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                }, {
                    "id": "5_1_3",
                    "name": "Api team",
                    "description": "",
                    "parent_id": "5_1",
                    "staff_department": "N",
                    "manager_id": "B02",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                }],
                "showChildren": false
            }, {
                "id": "5_2",
                "name": "Private Customer",
                "description": "",
                "parent_id": "5",
                "staff_department": "N",
                "manager_id": "B02",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }],
            "showChildren": false
        }, {
            "id": "6",
            "name": "Mobile Development",
            "description": "",
            "parent_id": "1",
            "staff_department": "N",
            "manager_id": "B05",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [{
                "id": "6_1",
                "name": "Android",
                "description": "",
                "parent_id": "6",
                "staff_department": "N",
                "manager_id": "B04",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }, {
                "id": "6_2",
                "name": "IOS",
                "description": "The IOS department creates and maintains applications for Apple phones and tablets",
                "parent_id": "6",
                "staff_department": "N",
                "manager_id": "B02",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }],
            "showChildren": false
        }, {
            "id": "7",
            "name": "Web Development",
            "description": "",
            "parent_id": "1",
            "staff_department": "N",
            "manager_id": "B05",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [{
                "id": "7_1",
                "name": "IE troubleshooters",
                "description": "",
                "parent_id": "7",
                "staff_department": "N",
                "manager_id": "B05",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }, {
                "id": "7_2",
                "name": "Javascript kiddies",
                "description": "",
                "parent_id": "7",
                "staff_department": "N",
                "manager_id": "B04",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }, {
                "id": "7_3",
                "name": "Java masters",
                "description": "",
                "parent_id": "7",
                "staff_department": "N",
                "manager_id": "B05",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }, {
                "id": "7_4",
                "name": "PHP people",
                "description": "",
                "parent_id": "7",
                "staff_department": "N",
                "manager_id": "B04",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }],
            "showChildren": false
        }, {
            "id": "9",
            "name": "Finance",
            "description": "",
            "parent_id": "1",
            "staff_department": "N",
            "manager_id": "B03",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [{
                "id": "9_1",
                "name": "Payments",
                "description": "",
                "parent_id": "9",
                "staff_department": "N",
                "manager_id": "B04",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }, {
                "id": "9_2",
                "name": "Invoices",
                "description": "",
                "parent_id": "9",
                "staff_department": "N",
                "manager_id": "B04",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }, {
                "id": "9_3",
                "name": "Incasso",
                "description": "",
                "parent_id": "9",
                "staff_department": "N",
                "manager_id": "B03",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }, {
                "id": "6_3",
                "name": "Other",
                "description": "",
                "parent_id": "9",
                "staff_department": "N",
                "manager_id": "B02",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [{
                    "id": "e6d71ac8-39c2-c334-4323-0688c96311f1",
                    "name": "new department type",
                    "description": "",
                    "parent_id": "6_3",
                    "staff_department": "N",
                    "manager_id": "B02",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [{
                        "id": "09a54438-5ef2-2295-b019-b18b922ed741",
                        "name": "subsub",
                        "description": "",
                        "parent_id": "e6d71ac8-39c2-c334-4323-0688c96311f1",
                        "staff_department": "N",
                        "dataFields": [{
                            "name": "Location",
                            "value": "",
                            "type": "text"
                        }],
                        "children": [],
                        "showChildren": false
                    }, {
                        "id": "50a97250-a02f-20de-4749-89103c1e40e6",
                        "name": "safsf",
                        "description": "",
                        "parent_id": "e6d71ac8-39c2-c334-4323-0688c96311f1",
                        "staff_department": "N",
                        "dataFields": [{
                            "name": "Location",
                            "value": "",
                            "type": "text"
                        }],
                        "children": [],
                        "showChildren": false
                    }],
                    "showChildren": false
                }],
                "showChildren": false
            }],
            "showChildren": false
        }, {
            "id": "10",
            "name": "Risk Management",
            "description": "",
            "parent_id": "1",
            "staff_department": "N",
            "manager_id": "B05",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [{
                "id": "10_1",
                "name": "Central Risk Management",
                "description": "",
                "parent_id": "10",
                "staff_department": "N",
                "manager_id": "B04",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }, {
                "id": "10_6",
                "name": "Operational Risk Management & Control",
                "description": "",
                "parent_id": "10",
                "staff_department": "N",
                "manager_id": "B05",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }],
            "showChildren": false
        }, {
            "id": "11",
            "name": "Innovation & Technology",
            "description": "",
            "parent_id": "1",
            "staff_department": "N",
            "manager_id": "B04",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [{
                "id": "11_1",
                "name": "Innovation",
                "description": "",
                "parent_id": "11",
                "staff_department": "N",
                "manager_id": "B03",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }, {
                "id": "11_2",
                "name": "Technology",
                "description": "",
                "parent_id": "11",
                "staff_department": "N",
                "manager_id": "B03",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }],
            "showChildren": false
        }, {
            "id": "12",
            "name": "Human Resources",
            "description": "",
            "parent_id": "1",
            "staff_department": "N",
            "manager_id": "B05",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [{
                "id": "12_1",
                "name": "Transformation Team",
                "description": "",
                "parent_id": "12",
                "staff_department": "N",
                "manager_id": "B03",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }, {
                "id": "12_2",
                "name": "Branding & Communications",
                "description": "",
                "parent_id": "12",
                "staff_department": "N",
                "manager_id": "B03",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [],
                "showChildren": false
            }],
            "showChildren": false
        }],
        "showChildren": true
    },
    "people": [{
        "id": "VOORZITTER",
        "name": "Robbert Vijgeboom",
        "photo": "Voorzitter",
        "functionName": "voorzitter",
        "fields": {
            "Email": "voorzitter@dordrechtlions.nl",
            "Phone": "06-xxxxxxxx",
            "Homepage": "dordrechtlions.nl",
            "Country": "Netherlands",
            "City": "Dordrecht",
        }
    }, {
        "id": "SECRETARIS",
        "name": "Rene van Osnabrugge",
        "photo": "Secretaris",
        "functionName": "Secretaris",
        "fields": {
            "Email": "secretaris@dordrechtlions.nl",
            "Phone": "06-28777178",
            "Homepage": "",
            "Country": "Netherlands",
            "City": "Hendrik-Ido-Ambacht",
        }
    }, {
        "id": "PENNINGMEESTER",
        "name": "Maarten van Zoest",
        "photo": "Penningmeester",
        "functionName": "Penningmeester",
        "fields": {
            "Email": "penningmeester@dordrechtlions.nl",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": "",
        }
    }, {
        "id": "WEDSTRIJDSECRETARIS",
        "name": "Malaika van Bloois",
        "photo": "",
        "functionName": "",
        "fields": {
            "Email": "",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": "",
        }
    }, {
        "id": "ALGBESTUUR01",
        "name": "",
        "photo": "",
        "functionName": "",
        "fields": {
            "Email": "MRX@somecomplany.mail",
            "Phone": "0345-394930207",
            "Homepage": "https://www.linkedin.com/company/philips/",
            "Country": "Netherlands",
            "City": "Utrecht",
            "Street": "Dorpstraat 9"
        }
    }, {
        "id": "B04",
        "name": "Mr y",
        "photo": "B04",
        "functionName": "CIO",
        "fields": {
            "Email": "",
            "Phone": "0345-394930208",
            "Homepage": "https://www.linkedin.com/company/philips/",
            "Country": "Netherlands",
            "City": "Utrecht",
            "Street": "Stationslaan 88"
        }
    }, {
        "id": "44",
        "name": "michael",
        "photo": "",
        "functionName": "",
        "fields": {
            "Email": "",
            "Phone": "0345-394930209",
            "Homepage": "https://www.linkedin.com/company/philips/",
            "Country": "Netherlands",
            "City": "Utrecht",
            "Street": "Het verdun 5"
        }
    }, {
        "name": "asdfasdf",
        "id": "asdfasdf",
        "manager": true,
        "photo": "",
        "functionName": "",
        "fields": {
            "Email": "",
            "Phone": "",
            "Homepage": "",
            "Country": "",
            "City": "",
            "Street": ""
        }
    }, {
        "name": "asdfasdfasd",
        "id": "fasddfasdf",
        "manager": true,
        "photo": "",
        "functionName": "",
        "fields": {
            "Email": "",
            "Phone": "",
            "Homepage": "",
            "Country": "",
            "City": "",
            "Street": ""
        }
    }, {
        "name": "jantje",
        "id": "al;skdj;lasdjf",
        "manager": false,
        "photo": "",
        "functionName": "",
        "fields": {
            "Email": "",
            "Phone": "",
            "Homepage": "",
            "Country": "",
            "City": "",
            "Street": ""
        }
    }, {
        "name": "mrnew",
        "id": "mrnew",
        "photo": "",
        "functionName": "",
        "fields": {
            "Email": "",
            "Phone": "",
            "Homepage": "",
            "Country": "",
            "City": "",
            "Street": ""
        }
    }],
    "assignments": [{
        "department_id": "6_2",
        "id": 0,
        "person_id": "VZ",
        "role": "strategy consultanting"
    }, {
        "department_id": "6_2",
        "id": 1,
        "person_id": "B03",
        "role": "scrum master"
    }, {
        "department_id": "6_2",
        "id": 4,
        "person_id": "B05",
        "role": "ux/ui designer"
    }, {
        "department_id": "6_2",
        "id": 5,
        "person_id": "B04",
        "role": "new tester"
    }, {
        "department_id": "6_2",
        "id": 6,
        "person_id": "44",
        "role": "tester"
    }, {
        "department_id": "5",
        "id": 9,
        "person_id": "al;skdj;lasdjf",
        "role": ""
    }, {
        "department_id": "6_2",
        "id": 10,
        "person_id": "mrnew",
        "role": "new job"
    }]
};
var UPDATED_ON = "13-09-2020"