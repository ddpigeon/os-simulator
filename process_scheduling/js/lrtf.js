
class Process {
    constructor(processno, AT, BT) {
        this.processno = processno;
        this.AT = AT;
        this.BT = BT;
        this.BTbackup = BT; 
        this.WT = 0; 
        this.TAT = 0; 
        this.CT = 0; 
    }
}


function findLargest(at, processes) {
    let max = 0;
    for (let i = 0; i < processes.length; i++) {
        if (processes[i].AT <= at && processes[i].BT > processes[max].BT) {
            max = i;
        }
    }
    return max;
}


function findCT(processes) {
    let index;
    let i = processes[0].AT;
    let totaltime = 0;
    let prefinaltotal = 0;
    for (let i = 0; i < processes.length; i++) {
        prefinaltotal += processes[i].BT;
    }

    while (true) {
        if (i <= 4) {
            index = findLargest(i, processes);
        } else {
            index = findLargest(4, processes);
        }

        processes[index].BT--;
        totaltime++;
        i++;

        if (processes[index].BT === 0) {
            processes[index].CT = totaltime;
        }

        if (totaltime === prefinaltotal) {
            break;
        }
    }
}

function calculateTimes(processes) {
    let totalWT = 0;
    let totalTAT = 0;
    for (let i = 0; i < processes.length; i++) {
        processes[i].TAT = processes[i].CT - processes[i].AT;
        processes[i].WT = processes[i].TAT - processes[i].BTbackup;
        totalWT += processes[i].WT;
        totalTAT += processes[i].TAT;
    }
    return { totalWT, totalTAT };
}

function scheduleProcesses() {
    const processes = [];
    let prefinaltotal = 0;

    for (let i = 0; i < 4; i++) {
        processes.push(new Process(i + 1, i + 1, 2 * (i + 1)));
        prefinaltotal += 2 * (i + 1);
    }


    processes.sort((a, b) => a.AT - b.AT);


    findCT(processes);


    const { totalWT, totalTAT } = calculateTimes(processes);

    console.log("PNo\tAT\tBT\tCT\tTAT\tWT");
    processes.forEach(process => {
        console.log(`${process.processno}\t${process.AT}\t${process.BTbackup}\t${process.CT}\t${process.TAT}\t${process.WT}`);
    });

    console.log("");
    console.log(`Total TAT = ${totalTAT}`);
    console.log(`Average TAT = ${totalTAT / 4.0}`);
    console.log(`Total WT = ${totalWT}`);
    console.log(`Average WT = ${totalWT / 4.0}`);
}


scheduleProcesses();
