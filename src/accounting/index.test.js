const { spawn } = require('child_process');
const path = require('path');

describe('Account Management System - Integration Tests', () => {
  const appPath = path.join(__dirname, 'index.js');

  test('TC001: View Initial Account Balance', (done) => {
    const child = spawn('node', [appPath], { stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.on('close', (code) => {
      expect(code).toBe(0);
      expect(output).toContain('Current balance: $1000.00');
      expect(output).toContain('Exiting the program. Goodbye!');
      done();
    });

    // Send: view balance (1), then exit (4)
    child.stdin.write('1\n');
    setTimeout(() => {
      child.stdin.write('4\n');
    }, 100);
  }, 5000);

  test('TC002: Credit Account with Positive Amount', (done) => {
    const child = spawn('node', [appPath], { stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.on('close', (code) => {
      expect(code).toBe(0);
      expect(output).toContain('Amount credited. New balance: $1500.00');
      expect(output).toContain('Exiting the program. Goodbye!');
      done();
    });

    // Send: credit (2), amount 500, view (1), exit (4)
    child.stdin.write('2\n');
    setTimeout(() => {
      child.stdin.write('500\n');
      setTimeout(() => {
        child.stdin.write('1\n');
        setTimeout(() => {
          child.stdin.write('4\n');
        }, 100);
      }, 100);
    }, 100);
  }, 5000);

  test('TC003: Debit Account with Sufficient Funds', (done) => {
    const child = spawn('node', [appPath], { stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.on('close', (code) => {
      expect(code).toBe(0);
      expect(output).toContain('Amount debited. New balance: $1200.00');
      expect(output).toContain('Exiting the program. Goodbye!');
      done();
    });

    // Send: credit 200 (to 1200), debit 300 (to 900? wait, test says from 1500 to 1200, but each test is separate
    // Wait, tests are independent, so for TC003, start fresh, credit 200, debit 300? But test says current balance 1500, but since separate, need to set up.
    // The test plan assumes sequential, but for unit tests, make them independent.
    // For TC003, start with 1000, credit 500 to 1500, debit 300 to 1200.

    child.stdin.write('2\n'); // credit
    setTimeout(() => {
      child.stdin.write('500\n'); // 500
      setTimeout(() => {
        child.stdin.write('3\n'); // debit
        setTimeout(() => {
          child.stdin.write('300\n'); // 300
          setTimeout(() => {
            child.stdin.write('1\n'); // view
            setTimeout(() => {
              child.stdin.write('4\n'); // exit
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  }, 5000);

  test('TC004: Debit Account with Insufficient Funds', (done) => {
    const child = spawn('node', [appPath], { stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.on('close', (code) => {
      expect(code).toBe(0);
      expect(output).toContain('Insufficient funds for this debit.');
      expect(output).toContain('Current balance: $1000.00'); // balance unchanged
      expect(output).toContain('Exiting the program. Goodbye!');
      done();
    });

    // Send: debit (3), amount 2000, view (1), exit (4)
    child.stdin.write('3\n');
    setTimeout(() => {
      child.stdin.write('2000\n');
      setTimeout(() => {
        child.stdin.write('1\n');
        setTimeout(() => {
          child.stdin.write('4\n');
        }, 100);
      }, 100);
    }, 100);
  }, 5000);

  test('TC005: Invalid Menu Choice Handling', (done) => {
    const child = spawn('node', [appPath], { stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.on('close', (code) => {
      expect(code).toBe(0);
      expect(output).toContain('Invalid choice, please select 1-4.');
      expect(output).toContain('Exiting the program. Goodbye!');
      done();
    });

    // Send: invalid (5), exit (4)
    child.stdin.write('5\n');
    setTimeout(() => {
      child.stdin.write('4\n');
    }, 100);
  }, 5000);

  test('TC006: Program Exit', (done) => {
    const child = spawn('node', [appPath], { stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.on('close', (code) => {
      expect(code).toBe(0);
      expect(output).toContain('Exiting the program. Goodbye!');
      done();
    });

    // Send: exit (4)
    child.stdin.write('4\n');
  }, 5000);

  test('TC007: Zero Amount Credit', (done) => {
    const child = spawn('node', [appPath], { stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.on('close', (code) => {
      expect(code).toBe(0);
      expect(output).toContain('Invalid credit amount.');
      expect(output).toContain('Current balance: $1000.00'); // unchanged
      expect(output).toContain('Exiting the program. Goodbye!');
      done();
    });

    // Send: credit (2), amount 0, view (1), exit (4)
    child.stdin.write('2\n');
    setTimeout(() => {
      child.stdin.write('0\n');
      setTimeout(() => {
        child.stdin.write('1\n');
        setTimeout(() => {
          child.stdin.write('4\n');
        }, 100);
      }, 100);
    }, 100);
  }, 5000);

  test('TC008: Zero Amount Debit', (done) => {
    const child = spawn('node', [appPath], { stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.on('close', (code) => {
      expect(code).toBe(0);
      expect(output).toContain('Invalid debit amount.');
      expect(output).toContain('Current balance: $1000.00'); // unchanged
      expect(output).toContain('Exiting the program. Goodbye!');
      done();
    });

    // Send: debit (3), amount 0, view (1), exit (4)
    child.stdin.write('3\n');
    setTimeout(() => {
      child.stdin.write('0\n');
      setTimeout(() => {
        child.stdin.write('1\n');
        setTimeout(() => {
          child.stdin.write('4\n');
        }, 100);
      }, 100);
    }, 100);
  }, 5000);

  test('TC009: Exact Balance Debit', (done) => {
    const child = spawn('node', [appPath], { stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.on('close', (code) => {
      expect(code).toBe(0);
      expect(output).toContain('Amount debited. New balance: $0.00');
      expect(output).toContain('Exiting the program. Goodbye!');
      done();
    });

    // Send: debit (3), amount 1000, view (1), exit (4)
    child.stdin.write('3\n');
    setTimeout(() => {
      child.stdin.write('1000\n');
      setTimeout(() => {
        child.stdin.write('1\n');
        setTimeout(() => {
          child.stdin.write('4\n');
        }, 100);
      }, 100);
    }, 100);
  }, 5000);

  test('TC010: Multiple Operations Sequence', (done) => {
    const child = spawn('node', [appPath], { stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.on('close', (code) => {
      expect(code).toBe(0);
      expect(output).toContain('Amount credited. New balance: $1200.00'); // +200
      expect(output).toContain('Amount debited. New balance: $1050.00');  // -150
      expect(output).toContain('Amount credited. New balance: $1100.00'); // +50
      expect(output).toContain('Current balance: $1100.00'); // final view
      expect(output).toContain('Exiting the program. Goodbye!');
      done();
    });

    // Send: credit 200, debit 150, credit 50, view, exit
    child.stdin.write('2\n'); // credit
    setTimeout(() => {
      child.stdin.write('200\n');
      setTimeout(() => {
        child.stdin.write('3\n'); // debit
        setTimeout(() => {
          child.stdin.write('150\n');
          setTimeout(() => {
            child.stdin.write('2\n'); // credit
            setTimeout(() => {
              child.stdin.write('50\n');
              setTimeout(() => {
                child.stdin.write('1\n'); // view
                setTimeout(() => {
                  child.stdin.write('4\n'); // exit
                }, 100);
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  }, 10000);
});