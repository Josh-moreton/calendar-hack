// Assert that defaultResult also substitutes placeholders
expect(defaultResult).not.toContain("@interval@");
expect(defaultResult).not.toContain("@easy@");
expect(defaultResult).toMatch(/\d:\d{2}/);
