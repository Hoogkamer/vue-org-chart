var INPUT_DATA = {
    "api_version": "2.0",
    "chart": {
        "id": "1",
        "name": "Voorzitter",
        "description": "",
        "parent_id": "",
        "staff_department": "N",
        "manager_id": "VOORZITTER",
        "dataFields": [{
            "name": "Location",
            "value": "",
            "type": "text"
        }],
        "children": [{
            "id": "2",
            "name": "Vertrouwenspersoon",
            "description": "",
            "parent_id": "1",
            "staff_department": "Y",
            "manager_id": "VERTROUWPERS",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [],
            "showChildren": true
        },
        {
            "id": "3",
            "name": "Wedstrijdsecretaris",
            "description": "",
            "parent_id": "1",
            "staff_department": "Y",
            "manager_id": "WEDSTRIJDSECRETARIS",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": []
        }, {
            "id": "4",
            "name": "Penningmeester",
            "description": "",
            "parent_id": "1",
            "staff_department": "N",
            "manager_id": "PENNINGMEESTER",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [
                {
                    "id": "4_1",
                    "name": "Ijsinkoop",
                    "description": "",
                    "parent_id": "4",
                    "staff_department": "N",
                    "manager_id": "IJSINKOOP",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                },
                {
                    "id": "4_2",
                    "name": "Kas Controle commissie",
                    "description": "",
                    "parent_id": "4",
                    "staff_department": "N",
                    "manager_id": "KAS",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                },
                {
                    "id": "4_1",
                    "name": "Sponsor Commissie",
                    "description": "",
                    "parent_id": "4",
                    "staff_department": "N",
                    "manager_id": "SPONSOR",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                },
                {
                    "id": "4_3",
                    "name": "Materiaal Commissie",
                    "description": "",
                    "parent_id": "4",
                    "staff_department": "N",
                    "manager_id": "MATERIAAL",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                },
                {
                    "id": "4_4",
                    "name": "Materiaal Team 1",
                    "description": "",
                    "parent_id": "4",
                    "staff_department": "N",
                    "manager_id": "MATERIAAL-TEAM1",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                },
                {
                    "id": "4_5",
                    "name": "Sponsor commissie",
                    "description": "",
                    "parent_id": "4",
                    "staff_department": "N",
                    "manager_id": "SPONSOR",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                },
                {
                    "id": "4_5",
                    "name": "Sponsoring Team 1",
                    "description": "",
                    "parent_id": "4",
                    "staff_department": "N",
                    "manager_id": "SPONSOR-TEAM1",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                },
                {
                    "id": "4_6",
                    "name": "Grote Clubactie",
                    "description": "",
                    "parent_id": "4",
                    "staff_department": "N",
                    "manager_id": "CLUBACTIE",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                },


            ],
            "showChildren": false
        },
        {
            "id": "5",
            "name": "Secretaris",
            "description": "",
            "parent_id": "1",
            "staff_department": "N",
            "manager_id": "SECRETARIS",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [{
                "id": "5_1",
                "name": "Leden administratie",
                "description": "",
                "parent_id": "5",
                "staff_department": "N",
                "manager_id": "LEDEN",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": []
            },
            {
                "id": "5_2",
                "name": "Contactpersoon Optisport",
                "description": "",
                "parent_id": "5",
                "staff_department": "N",
                "manager_id": "CONTACT-OPTISPORT",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": []
            },
            {
                "id": "5_3",
                "name": "Contactpersoon Gemeente",
                "description": "",
                "parent_id": "5",
                "staff_department": "N",
                "manager_id": "CONTACT-GEMEENTE",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": []
            },
            {
                "id": "5_4",
                "name": "Contactpersoon Gebruikersoverleg",
                "description": "",
                "parent_id": "5",
                "staff_department": "N",
                "manager_id": "CONTACT-GEBRUIKERSOVERLEG",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": []
            },
            {
                "id": "5_5",
                "name": "Communicatie Coordinator",
                "description": "",
                "parent_id": "5",
                "staff_department": "N",
                "manager_id": "COMMUNICATIE",
                "dataFields": [{
                    "name": "Location",
                    "value": "",
                    "type": "text"
                }],
                "children": [
                    {
                        "id": "5_5_1",
                        "name": "Communicatie Leden",
                        "description": "",
                        "parent_id": "5_5",
                        "staff_department": "N",
                        "manager_id": "COMMUNICATIE-LEDEN",
                        "dataFields": [{
                            "name": "Location",
                            "value": "",
                            "type": "text"
                        }],
                        "children": []
                    },
                    {
                        "id": "5_5",
                        "name": "Communicatie Team Managers",
                        "description": "",
                        "parent_id": "5_5",
                        "staff_department": "N",
                        "manager_id": "COMMUNICATIE-TM",
                        "dataFields": [{
                            "name": "Location",
                            "value": "",
                            "type": "text"
                        }],
                        "children": []
                    }

                ]
            },


            ]
        },
        {
            "id": "6",
            "name": "Technisch Bestuurslid",
            "description": "",
            "parent_id": "1",
            "staff_department": "N",
            "manager_id": "TECHBESTUUR01",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [
                {
                    "id": "6_1",
                    "name": "Technische Commissie Team 1 + Team 2",
                    "description": "",
                    "parent_id": "6",
                    "staff_department": "N",
                    "manager_id": "TC-TEAM1-2",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": []
                },
                {
                    "id": "6_1",
                    "name": "Technische Commissie Jeugd",
                    "description": "IJHS2, U9, U11, U13, U15, JUNIOREN",
                    "parent_id": "6",
                    "staff_department": "N",
                    "manager_id": "TC-JONGEJEUGD",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": []
                },
                {
                    "id": "6_2",
                    "name": "Technische Commissie U17",
                    "description": "",
                    "parent_id": "6",
                    "staff_department": "N",
                    "manager_id": "TC-OUDEJEUGD",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": []
                },
                {
                    "id": "6_3",
                    "name": "Technische Commissie Senioren",
                    "description": "Team 3, Team 4, Team 5, Team 6, IJHS VW",
                    "parent_id": "6",
                    "staff_department": "N",
                    "manager_id": "TC-SENIOREN",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": []
                }
            ],
            "showChildren": false
        },
        {
            "id": "7",
            "name": "Algemeen Bestuurslid",
            "description": "",
            "parent_id": "1",
            "staff_department": "N",
            "manager_id": "ALGBESTUUR01",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [
                {
                    "id": "7_1",
                    "name": "Social Media Commissie",
                    "description": "",
                    "parent_id": "7",
                    "staff_department": "N",
                    "manager_id": "SOCIALMEDIA",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                },
                {
                    "id": "7_2",
                    "name": "Website onderhoud",
                    "description": "",
                    "parent_id": "7",
                    "staff_department": "N",
                    "manager_id": "WEBSITE",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                },
                {
                    "id": "7_3",
                    "name": "Video Team",
                    "description": "",
                    "parent_id": "7",
                    "staff_department": "N",
                    "manager_id": "VIDEO01",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                },
                {
                    "id": "7_4",
                    "name": "Kleding coordinator",
                    "description": "",
                    "parent_id": "1",
                    "staff_department": "N",
                    "manager_id": "KLEDING",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [
                        {
                            "id": "7_4_1",
                            "name": "Tenues Team 1",
                            "description": "",
                            "parent_id": "1",
                            "staff_department": "N",
                            "manager_id": "KLEDING-TEAM1",
                            "dataFields": [{
                                "name": "Location",
                                "value": "",
                                "type": "text"
                            }],
                            "children": [],
                            "showChildren": false
                        },
                        {
                            "id": "7_4_2",
                            "name": "Kleding Vereniging (ex Team 1)",
                            "description": "",
                            "parent_id": "1",
                            "staff_department": "N",
                            "manager_id": "MATERIAAL",
                            "dataFields": [{
                                "name": "Location",
                                "value": "",
                                "type": "text"
                            }],
                            "children": [],
                            "showChildren": false
                        },
                        {
                            "id": "7_4_3",
                            "name": "Merchandise",
                            "description": "",
                            "parent_id": "1",
                            "staff_department": "N",
                            "manager_id": "MERCHANDISE",
                            "dataFields": [{
                                "name": "Location",
                                "value": "",
                                "type": "text"
                            }],
                            "children": [],
                            "showChildren": false
                        }

                    ],
                    "showChildren": false
                }

            ],
            "showChildren": false
        },
        {
            "id": "8",
            "name": "Algemeen Bestuurslid",
            "description": "Jeugd, Werving, Activiteiten",
            "parent_id": "1",
            "staff_department": "N",
            "manager_id": "ALGBESTUUR02",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [
                {
                    "id": "8_1",
                    "name": "Jeugd Coordinator",
                    "description": "",
                    "parent_id": "8",
                    "staff_department": "N",
                    "manager_id": "JEUGDCOORDINATOR",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                },
                {
                    "id": "8_2",
                    "name": "Wervings commissie",
                    "description": "",
                    "parent_id": "8",
                    "staff_department": "N",
                    "manager_id": "WERVING",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                },
                {
                    "id": "8_3",
                    "name": "Ijshockey School",
                    "description": "",
                    "parent_id": "8",
                    "staff_department": "N",
                    "manager_id": "IJHS",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                },
                {
                    "id": "8_4",
                    "name": "Activiteiten Commissie",
                    "description": "",
                    "parent_id": "8",
                    "staff_department": "N",
                    "manager_id": "ACTIVITEIT",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                },
                {
                    "id": "8_5",
                    "name": "Toernooi Commissie",
                    "description": "Jeugd, Werving, Activiteiten",
                    "parent_id": "8",
                    "staff_department": "N",
                    "manager_id": "TOERNOOI",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                }

            ],
            "showChildren": false
        },
        {
            "id": "9",
            "name": "Algemeen Bestuurslid",
            "description": "",
            "parent_id": "1",
            "staff_department": "N",
            "manager_id": "ALGBESTUUR03",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [
                {
                    "id": "9_1",
                    "name": "Scheidsrechter coordinator",
                    "description": "",
                    "parent_id": "9",
                    "staff_department": "N",
                    "manager_id": "SCHEIDS",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                },
                {
                    "id": "9_2",
                    "name": "Bench commissie",
                    "description": "",
                    "parent_id": "9",
                    "staff_department": "N",
                    "manager_id": "BENCH-COMMISSIE",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [
                        {
                            "id": "9_2_1",
                            "name": "Bench coordinator Team 1",
                            "description": "",
                            "parent_id": "9_2",
                            "staff_department": "N",
                            "manager_id": "BENCH-TEAM1",
                            "dataFields": [{
                                "name": "Location",
                                "value": "",
                                "type": "text"
                            }],
                            "children": [],
                            "showChildren": false
                        },
                        {
                            "id": "9_2_2",
                            "name": "Camera / Klok",
                            "description": "",
                            "parent_id": "9_2",
                            "staff_department": "N",
                            "manager_id": "KLOK-TEAM1",
                            "dataFields": [{
                                "name": "Location",
                                "value": "",
                                "type": "text"
                            }],
                            "children": [],
                            "showChildren": false
                        },
                        {
                            "id": "9_2_4",
                            "name": "Bench Algemeen",
                            "description": "Regels, Egrep, Cursus",
                            "parent_id": "9_2",
                            "staff_department": "N",
                            "manager_id": "BENCH",
                            "dataFields": [{
                                "name": "Location",
                                "value": "",
                                "type": "text"
                            }],
                            "children": [],
                            "showChildren": false
                        }
                    ],
                    "showChildren": false
                },

                {
                    "id": "9_4",
                    "name": "Straf commissie",
                    "description": "",
                    "parent_id": "9",
                    "staff_department": "N",
                    "manager_id": "STRAF",
                    "dataFields": [{
                        "name": "Location",
                        "value": "",
                        "type": "text"
                    }],
                    "children": [],
                    "showChildren": false
                }

            ],
            "showChildren": false
        },
        {
            "id": "10",
            "name": "Algemeen Bestuurslid",
            "description": "",
            "parent_id": "1",
            "staff_department": "N",
            "manager_id": "ALGBESTUUR04",
            "dataFields": [{
                "name": "Location",
                "value": "",
                "type": "text"
            }],
            "children": [],
            "showChildren": false
        }
        ]
    },

    "people": [{
        "id": "VOORZITTER",
        "name": "Robbert Vijgeboom",
        "photo": "VOORZITTER",
        "functionName": "Voorzitter",
        "fields": {
            "Email": "voorzitter@dordrechtlions.nl",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "SECRETARIS",
        "name": "Vacature",
        "photo": "SECRETARIS",
        "functionName": "Secretaris",
        "fields": {
            "Email": "secretaris@dordrechtlions.nl",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "WEDSTRIJDSECRETARIS",
        "name": "Malaika van Bloois",
        "photo": "WEDSTRIJDSECRETARIS",
        "functionName": "Wedstrijdsecretaris",
        "fields": {
            "Email": "wedstrijdsecretaris@dordrechtlions.nl",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "PENNINGMEESTER",
        "name": "Maarten van Zoest",
        "photo": "PENNINGMEESTER",
        "functionName": "Penningmeester",
        "fields": {
            "Email": "penningmeester@dordrechtlions.nl",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "ALGBESTUUR01",
        "name": "Monique Borsboom",
        "photo": "ALGBESTUUR01",
        "functionName": "Algemeen Bestuurslid",
        "fields": {
            "Email": "monique@gmail.com",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "ALGBESTUUR02",
        "name": "Johan van Ballegooijen",
        "photo": "ALGBESTUUR02",
        "functionName": "Algemeen Bestuurslid",
        "fields": {
            "Email": "johan@gmail.com",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "ALGBESTUUR03",
        "name": "Natasja de Man",
        "photo": "ALGBESTUUR03",
        "functionName": "Algemeen Bestuurslid",
        "fields": {
            "Email": "natasja@gmail.com",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "ALGBESTUUR04",
        "name": "Dimitri Roos",
        "photo": "ALGBESTUUR04",
        "functionName": "Algemeen Bestuurslid",
        "fields": {
            "Email": "contact-optisport@dordrechtlions.nl",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TECHBESTUUR01",
        "name": "Sirio Barone",
        "photo": "TECHBESTUUR01",
        "functionName": "Technisch Bestuurslid",
        "fields": {
            "Email": "siriobarone@gmail.com",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "VERTROUWPERS",
        "name": "Jennifer van Meteren",
        "photo": "VERTROUWPERS",
        "functionName": "Vertrouwenspersoon",
        "fields": {
            "Email": "jennifer@outlook.com",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },

    {
        "id": "TM-TEAM1",
        "name": "Bertine Veenhuizen",
        "photo": "TM-TEAM1",
        "functionName": "Team Manager Team 1",
        "fields": {
            "Email": "bertine@gmail.com",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TM-TEAM2",
        "name": "Vacature",
        "photo": "TM-TEAM2",
        "functionName": "Team Manager Team 2",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TM-TEAM3",
        "name": "Vacature",
        "photo": "TM-TEAM3",
        "functionName": "Team Manager Team 3",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TM-TEAM4",
        "name": "Vacature",
        "photo": "TM-TEAM4",
        "functionName": "Team Manager Team 4",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TM-TEAM5",
        "name": "Maarten van Zoest",
        "photo": "TM-TEAM5",
        "functionName": "Team Manager Team 5",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TM-TEAM6",
        "name": "Vacature",
        "photo": "TM-TEAM6",
        "functionName": "Team Manager Team 6",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TM-U17",
        "name": "Hanneke Schot",
        "photo": "TM-U17",
        "functionName": "Team Manager U17",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TM-U15",
        "name": "Hans va Bree",
        "photo": "TM-U15",
        "functionName": "Team Manager U15",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TM-U13",
        "name": "Rene van Osnabrugge",
        "photo": "TM-U13",
        "functionName": "Team Manager U13",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TM-U9U11",
        "name": "Floortje Cloin",
        "photo": "TM-U9U11",
        "functionName": "Team Manager U9-U11",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TM-Junioren",
        "name": "Rob Kemper",
        "photo": "TM-Junioren",
        "functionName": "Team Manager Junioren",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "LEDEN",
        "name": "Brenda Leendertse",
        "photo": "LEDEN",
        "functionName": "Leden administratie",
        "fields": {
            "Email": "leden@dordrechtlions.nl",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "CONTACT-OPTISPORT",
        "name": "Dimitri Roos",
        "photo": "CONTACT-OPTISPORT",
        "functionName": "Contactpersoon Optisport",
        "fields": {
            "Email": "contact-optisport@dordrechtlions.nl",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "COMMUNICATIE",
        "name": "Vacature",
        "photo": "COMMUNICATIE",
        "functionName": "Interne communicatie",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "SOCIALMEDIA",
        "name": "Vacature",
        "photo": "SOCIALMEDIA",
        "functionName": "Social Media Commissie",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "WEBSITE",
        "name": "Sander de Gruiter",
        "photo": "WEBSITE",
        "functionName": "Website",
        "fields": {
            "Email": "sander@degruiter.nl",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "VIDEO01",
        "name": "Fred Hartman",
        "photo": "VIDEO01",
        "functionName": "Video Team",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "KLEDING",
        "name": "Monique Borsboom",
        "photo": "KLEDING",
        "functionName": "Kleding commissie",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "KLEDING-TEAM1",
        "name": "Frans Hardenbol",
        "photo": "KLEDING-TEAM1",
        "functionName": "Kleding team 1",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "MATERIAAL",
        "name": "Sander de Gruiter",
        "photo": "MATERIAAL",
        "functionName": "Materiaal Commissie",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "MATERIAAL-TEAM1",
        "name": "Frans Hardenbol",
        "photo": "MATERIAAL-TEAM1",
        "functionName": "Materiaal team 1",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "MERCHANDISE",
        "name": "Monique Borsboom",
        "photo": "MERCHANDISE",
        "functionName": "Merchandise",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "IJSINKOOP",
        "name": "Malaika van Bloois",
        "photo": "IJSINKOOP",
        "functionName": "Ijs inkoop",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "SPONSOR",
        "name": "Sander de Gruiter",
        "photo": "SPONSOR",
        "functionName": "Sponsor Commissie",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "CLUBACTIE",
        "name": "Tonnie van Osnabrugge",
        "photo": "CLUBACTIE",
        "functionName": "Grote Clubactie coordinator",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TRAINER-TEAM1",
        "name": "Paul Vincent",
        "photo": "TRAINER-TEAM1",
        "functionName": "Hoofdtrainer Team 1",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TRAINER-JEUGD",
        "name": "Paul Vincent",
        "photo": "TRAINER-JEUGD",
        "functionName": "Hoofdtrainer Jeugd",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "JEUGDCOORDINATOR",
        "name": "Johan van Ballegooijen",
        "photo": "JEUGDCOORDINATOR",
        "functionName": "Jeugd coordinator",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },

    {
        "id": "TC-TEAM1-2",
        "name": "Sirio Barone",
        "photo": "TC-TEAM1-2",
        "functionName": "Technische Commissie Team 1/Team 2",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TC-OUDEJEUGD",
        "name": "Ferdinand de Man",
        "photo": "TC-OUDEJEUGD",
        "functionName": "Technische Commissie U15, U17",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TC-JONGEJEUGD",
        "name": "Duane Latuperissa",
        "photo": "TC-JONGEJEUGD",
        "functionName": "Technische Commissie U9, U11, U13",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TC-SENIOREN",
        "name": "Ferdinand de Man",
        "photo": "TC-SENIOREN",
        "functionName": "Technische Commissie Senioren",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "TOERNOOI",
        "name": "Esmee Kwantes",
        "photo": "TOERNOOI",
        "functionName": "Toernooi Commissie",
        "fields": {
            "Email": "xx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "ACTIVITEIT",
        "name": "Vacature",
        "photo": "ACTIVITEIT",
        "functionName": "Activiteiten Commissie",
        "fields": {
            "Email": "xx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "WERVING",
        "name": "Marijke Laging",
        "photo": "WERVING",
        "functionName": "Wervingscommissie",
        "fields": {
            "Email": "xx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "IJHS",
        "name": "Paula Verkerk",
        "photo": "IJHS",
        "functionName": "Ijshockeyschool",
        "fields": {
            "Email": "xxx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "SCHEIDS",
        "name": "Marco Bekker",
        "photo": "SCHEIDS",
        "functionName": "Scheidsrechter commissie",
        "fields": {
            "Email": "xx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "BENCH",
        "name": "Dick Passchier",
        "photo": "BENCH",
        "functionName": "Bench coordinatie",
        "fields": {
            "Email": "xx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "BENCH-TEAM1",
        "name": "Carina Rhijnen",
        "photo": "BENCH-TEAM1",
        "functionName": "Bench coordinatie Team 1",
        "fields": {
            "Email": "xx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "STRAF",
        "name": "Elisa Borsje",
        "photo": "STRAF",
        "functionName": "Stra coordinator",
        "fields": {
            "Email": "",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "KLOK-TEAM1",
        "name": "Francois Longyaroux",
        "photo": "KLOK-TEAM1",
        "functionName": "Klok Team 1",
        "fields": {
            "Email": "xx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    },
    {
        "id": "CAMERA-TEAM1",
        "name": "Francois Longyaroux",
        "photo": "CAMERA-TEAM1",
        "functionName": "Camera Team 1",
        "fields": {
            "Email": "xx",
            "Phone": "",
            "Homepage": "",
            "Country": "Netherlands",
            "City": ""
        }
    }

    ],
    "assignments": []
};
var UPDATED_ON = "13-09-2020"