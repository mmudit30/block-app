const Result = artifacts.require('Result');

contract('Result', (accounts) => {
  let [bob, alice, phong] = accounts;
  let contract;
  beforeEach(async () => {
    contract = await Result.new();
  });
  it('should allow to assign doctor', async () => {
    const result = await contract.assignDoctor(alice, 'VN-54', 'Bob', 'CV', {
      from: bob,
    });
    assert.equal(result.receipt.status, true);
  });
  it('should allow to add result', async () => {
    await contract.assignDoctor(alice, 'VN-54', 'Bob', 'CV', {
      from: bob,
    });
    const result = await contract.addResult(
      'Passport1',
      'Phong',
      'passport',
      'negative',
      { from: alice }
    );
    assert.equal(result.receipt.status, true);
  });
  it('should allow to edit', async () => {
    await contract.assignDoctor(alice, 'VN-54', 'Bob', 'CV', {
      from: bob,
    });
    await contract.addResult('Passport1', 'Phong', 'passport', 'negative', {
      from: alice,
    });
    const result = await contract.editResult('Passport1', 'positive', {
      from: alice,
    });
    assert.equal(result.receipt.status, true);
  });
  it('should return correct symptoms', async () => {
    await contract.assignDoctor(alice, 'VN-54', 'Bob', 'CV', {
      from: bob,
    });
    await contract.addResult('Passport1', 'Phong', 'passport', 'negative', {
      from: alice,
    });
    const result1 = await contract.getResult('Passport1', { from: phong });
    console.log(result1);
    assert.equal(
      result1.toString(),
      {
        '0': 'Phong',
        '1': 'passport',
        '2': 'VN-54',
        '3': 'negative',
      }.toString()
    );
  });
  afterEach(async () => {
    await contract.kill();
  });
});
