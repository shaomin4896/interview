//#region Data

const factories = [
    { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
    { name: "BR2", employees: ["Jessie", "Karen", "John"] },
    { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
    { name: "BR4", employees: [] }
]; //
const employeeType = [
    { id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00" },
    { id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00" },
    { id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00" },
];

const employees = [
    { id: 1, name: "Alice", type: 2 },
    { id: 2, name: "Bob", type: 3 },
    { id: 3, name: "John", type: 2 },
    { id: 4, name: "Karen", type: 1 },
    { id: 5, name: "Miles", type: 3 },
    { id: 6, name: "Henry", type: 1 }
];

const tasks = [
    { id: 1, title: "task01", duration: 60 },//min
    { id: 2, title: "task02", duration: 120 },
    { id: 3, title: "task03", duration: 180 },
    { id: 4, title: "task04", duration: 360 },
    { id: 5, title: "task05", duration: 30 },
    { id: 6, title: "task06", duration: 220 },
    { id: 7, title: "task07", duration: 640 },
    { id: 8, title: "task08", duration: 250 },
    { id: 9, title: "task09", duration: 119 },
    { id: 10, title: "task10", duration: 560 },
    { id: 11, title: "task11", duration: 340 },
    { id: 12, title: "task12", duration: 45 },
    { id: 13, title: "task13", duration: 86 },
    { id: 14, title: "task14", duration: 480 },
    { id: 15, title: "task15", duration: 900 }
];

//#endregion

//#region Session1
const Count_Employees_Number_By_Factory = () => {
    // 範例答案提到 [ {name: 'BR1', count: 4 // BR1 工廠總人數應該是五人}, ... ] 
    let employeeNumberByFactory = factories.map((factory) => {
        return {
            name: factory.name,
            count: factory.employees.length
        };
    });
    return employeeNumberByFactory;
}

const Count_Factories_Number_By_Employee = () => {
    let employeeMappingCount = [];
    factories.forEach((factory) => {
        factory.employees.forEach(employee => {
            if (employeeMappingCount[employee] == undefined) {
                employeeMappingCount[employee] = 1;
            } else {
                employeeMappingCount[employee] += 1;
            }
        });
    });
    return Object.keys(employeeMappingCount).map((name) => ({
        employee: name,
        count: employeeMappingCount[name]
    }));
}

const Order_Employees_List_By_Alphabetical = () => {
    let factoriesCloned = factories.map(x => ({ name: x.name, employees: [...x.employees] }));
    factoriesCloned.forEach((factory) => factory.employees.sort());
    return factoriesCloned;
}
let Answer1 = Count_Employees_Number_By_Factory();
let Answer2 = Count_Factories_Number_By_Employee();
let Answer3 = Order_Employees_List_By_Alphabetical();

//#endregion


//#region  Session2
const Count_Total_Hours_Worked_1Day = () => {
    // 如果計算「所有人員」一天的工作時數結果應為 42 ，題目並未詳列計算方式
    let mappedEmployees = employees.map((employee) => {
        let mappedType = employeeType.filter(type => type.id == employee.type)[0];
        let mappedEmployee = {
            name: employee.name,
            work_begin: Date.parse('1/1/1999 ' + mappedType.work_begin),
            work_end: Date.parse('1/1/1999 ' + (mappedType.work_end == '00:00:00' ? '24:00:00' : mappedType.work_end)),
        };
        return mappedEmployee;
    });
    let TotalMilliSecond = mappedEmployees.reduce((previousWorkedHour, currentEmployee) => {
        return previousWorkedHour + (currentEmployee.work_end - currentEmployee.work_begin);
    }, 0);
    return TotalMilliSecond / (60 * 60 * 1000);
}

const How_Many_Employee_By_Time = (time) => {
    time = Date.parse('1/1/1999 ' + (time == '00:00:00' ? '24:00:00' : time))
    let mappedEmployees = employees.map((employee) => {
        let mappedType = employeeType.filter(type => type.id == employee.type)[0];
        let mappedEmployee = {
            name: employee.name,
            work_begin: Date.parse('1/1/1999 ' + mappedType.work_begin),
            work_end: Date.parse('1/1/1999 ' + (mappedType.work_end == '00:00:00' ? '24:00:00' : mappedType.work_end)),
        };
        return mappedEmployee;
    });
    return mappedEmployees.filter(employee => employee.work_begin <= time && time <= employee.work_end).length;
}

const Days_Needed_To_Done_Tasks = () => {
    // 並沒有提到 duration 意指「當前只有一個人在工作的情況之下」亦或是「多人工作的情況之下」的計算結果，請詳列計算公式
    // 1 day = 9:00 to 00:00 between 00:00 and 09:00 doesnt count. 我不知道從何判斷您的計算方式
}

let Answer4 = Count_Total_Hours_Worked_1Day();
let Answer5 = How_Many_Employee_By_Time("13:00:00");
let Answer6 = Days_Needed_To_Done_Tasks();
//#endregion