# COBOL Student Account Management System - Test Plan

This test plan covers the business logic and functionality of the legacy COBOL student account management system. It is designed to validate the system's behavior against business requirements and will be used to create unit and integration tests in the Node.js modernization effort.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|----------------------|----------------|------------|----------------|----------------|-------------------|----------|
| TC001 | View Initial Account Balance | Application is running with default balance of $1000.00 | 1. Start the application<br>2. Select option 1 (View Balance) | Current balance displays as $1000.00 |  |  | Initial balance validation |
| TC002 | Credit Account with Positive Amount | Application is running, current balance is $1000.00 | 1. Select option 2 (Credit Account)<br>2. Enter credit amount: 500.00<br>3. Select option 1 to view updated balance | Balance increases to $1500.00 and displays correctly |  |  | Test positive credit operation |
| TC003 | Debit Account with Sufficient Funds | Application is running, current balance is $1500.00 (after TC002) | 1. Select option 3 (Debit Account)<br>2. Enter debit amount: 300.00<br>3. Select option 1 to view updated balance | Balance decreases to $1200.00 and displays correctly |  |  | Test successful debit with sufficient funds |
| TC004 | Debit Account with Insufficient Funds | Application is running, current balance is $1200.00 (after TC003) | 1. Select option 3 (Debit Account)<br>2. Enter debit amount: 2000.00 | Error message "Insufficient funds for this debit." displays, balance remains unchanged |  |  | Test debit validation and error handling |
| TC005 | Invalid Menu Choice Handling | Application is running | 1. Enter invalid choice (e.g., 5 or 'a') | Error message "Invalid choice, please select 1-4." displays, menu redisplays |  |  | Test input validation for menu options |
| TC006 | Program Exit | Application is running | 1. Select option 4 (Exit) | Program terminates with message "Exiting the program. Goodbye!" |  |  | Test clean program termination |
| TC007 | Zero Amount Credit | Application is running, current balance is $1000.00 | 1. Select option 2 (Credit Account)<br>2. Enter credit amount: 0.00<br>3. Select option 1 to view balance | Balance remains $1000.00 (no change) |  |  | Edge case: zero credit amount |
| TC008 | Zero Amount Debit | Application is running, current balance is $1000.00 | 1. Select option 3 (Debit Account)<br>2. Enter debit amount: 0.00<br>3. Select option 1 to view balance | Balance remains $1000.00 (no change) |  |  | Edge case: zero debit amount |
| TC009 | Exact Balance Debit | Application is running, current balance is $1000.00 | 1. Select option 3 (Debit Account)<br>2. Enter debit amount: 1000.00<br>3. Select option 1 to view balance | Balance becomes $0.00 |  |  | Edge case: debit exact remaining balance |
| TC010 | Multiple Operations Sequence | Application is running, start with $1000.00 | 1. Credit $200.00<br>2. Debit $150.00<br>3. Credit $50.00<br>4. View balance | Final balance is $1100.00 |  |  | Test operation sequencing and cumulative effects |

## Test Execution Notes

- **Environment:** COBOL application compiled with `cobc` and run in terminal
- **Data Setup:** Each test case assumes the previous state unless specified otherwise
- **Reset Procedure:** Restart application to reset balance to $1000.00 between test runs
- **Validation Points:** Verify both displayed output and internal balance state
- **Business Rules Tested:**
  - Initial balance of $1000.00
  - Credit operations can add any positive amount
  - Debit operations require sufficient funds
  - Balance cannot go negative
  - Invalid inputs are handled gracefully
  - Program maintains state across operations within a session