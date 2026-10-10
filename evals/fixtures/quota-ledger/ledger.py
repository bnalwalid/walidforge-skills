class QuotaLedger:
    def __init__(self, budgets):
        self._budgets = dict(budgets)

    def remaining(self, account):
        return self._budgets[account]

    def reserve(self, account, operation_key, units):
        if account not in self._budgets:
            raise ValueError("unknown account")
        if not isinstance(units, int) or isinstance(units, bool) or units <= 0:
            raise ValueError("units must be a positive integer")
        if units > self._budgets[account]:
            raise ValueError("insufficient quota")
        self._budgets[account] -= units
        return self._budgets[account]
