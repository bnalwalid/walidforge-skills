import unittest
from ledger import QuotaLedger


class ReservationBaseline(unittest.TestCase):
    def test_reservation_consumes_requested_quota(self):
        ledger = QuotaLedger({"alpha": 10})
        self.assertEqual(ledger.reserve("alpha", "export-1", 3), 7)
        self.assertEqual(ledger.remaining("alpha"), 7)

    def test_failed_reservation_preserves_account_budget(self):
        ledger = QuotaLedger({"alpha": 2})
        with self.assertRaises(ValueError):
            ledger.reserve("alpha", "export-1", 3)
        self.assertEqual(ledger.remaining("alpha"), 2)

    def test_invalid_amounts_are_rejected(self):
        for units in [True, 0, -1, 1.5, "2"]:
            with self.subTest(units=units):
                ledger = QuotaLedger({"alpha": 10})
                with self.assertRaises(ValueError):
                    ledger.reserve("alpha", "export-1", units)
                self.assertEqual(ledger.remaining("alpha"), 10)


if __name__ == "__main__":
    unittest.main()
