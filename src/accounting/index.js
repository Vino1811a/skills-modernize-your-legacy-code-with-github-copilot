const readline = require('readline');

class AccountSystem {
    constructor() {
        this.balance = 1000.00; // Initial balance
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // Data management - equivalent to data.cob
    readBalance() {
        return this.balance;
    }

    writeBalance(newBalance) {
        this.balance = newBalance;
    }

    // Operations - equivalent to operations.cob
    async viewBalance() {
        const balance = this.readBalance();
        console.log(`Current balance: $${balance.toFixed(2)}`);
    }

    async creditAccount() {
        const amount = await this.promptAmount('Enter credit amount: ');
        if (amount > 0) {
            const currentBalance = this.readBalance();
            const newBalance = currentBalance + amount;
            this.writeBalance(newBalance);
            console.log(`Amount credited. New balance: $${newBalance.toFixed(2)}`);
        } else {
            console.log('Invalid credit amount.');
        }
    }

    async debitAccount() {
        const amount = await this.promptAmount('Enter debit amount: ');
        if (amount > 0) {
            const currentBalance = this.readBalance();
            if (currentBalance >= amount) {
                const newBalance = currentBalance - amount;
                this.writeBalance(newBalance);
                console.log(`Amount debited. New balance: $${newBalance.toFixed(2)}`);
            } else {
                console.log('Insufficient funds for this debit.');
            }
        } else {
            console.log('Invalid debit amount.');
        }
    }

    async promptAmount(prompt) {
        return new Promise((resolve) => {
            this.rl.question(prompt, (input) => {
                const amount = parseFloat(input);
                resolve(isNaN(amount) ? 0 : amount);
            });
        });
    }

    async promptChoice() {
        return new Promise((resolve) => {
            this.rl.question('Enter your choice (1-4): ', (input) => {
                const choice = parseInt(input);
                resolve(isNaN(choice) ? 0 : choice);
            });
        });
    }

    // Main program - equivalent to main.cob
    async run() {
        let continueFlag = true;

        while (continueFlag) {
            console.log('--------------------------------');
            console.log('Account Management System');
            console.log('1. View Balance');
            console.log('2. Credit Account');
            console.log('3. Debit Account');
            console.log('4. Exit');
            console.log('--------------------------------');

            const userChoice = await this.promptChoice();

            switch (userChoice) {
                case 1:
                    await this.viewBalance();
                    break;
                case 2:
                    await this.creditAccount();
                    break;
                case 3:
                    await this.debitAccount();
                    break;
                case 4:
                    continueFlag = false;
                    break;
                default:
                    console.log('Invalid choice, please select 1-4.');
            }
        }

        console.log('Exiting the program. Goodbye!');
        this.rl.close();
    }
}

// Run the application
const app = new AccountSystem();
app.run();