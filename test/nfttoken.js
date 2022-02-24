const NFTToken = artifacts.require("NFTToken");

contract("NFTToken", accounts => {

    it("should verify that the account[0] does not have tokens", async function(){
        const instance = await NFTToken.deployed();
        const balance0 = await instance.balanceOf(accounts[0]);
        assert.equal(balance0, 0, "Balance not empty");
    });

    it("should mint one NFT Token", async function(){
        const instance = await NFTToken.deployed();
        const tx = await instance.createCollectible();
        const tokenCounter = await instance.tokenCounter();
        assert.equal(tokenCounter, 1, "NFT not minted correctly");

    });

    it("should check if the balance of the owner is 1", async function(){
        const instance = await NFTToken.deployed();
        //const tx = await instance.createCollectible();
        const balance = await instance.balanceOf(accounts[0]);
        assert.equal(balance, 1, "Balance not correct");
    });

    it("should verify that the account[0] is owner of the token 0", async function(){
        const instance = await NFTToken.deployed();
        // const tx = await instance.createCollectible();
        const tokenCounter = await instance.tokenCounter();
        const owner = await instance.ownerOf(tokenCounter - 1);
        assert.equal(owner, accounts[0], "Owner not correct");
    });

    it("should send the token to the accounts[1] and verify balances", async function(){
        const instance = await NFTToken.deployed();
        const balance1 = await instance.balanceOf(accounts[1]);
        assert.equal(balance1, 0, "Balance not zero");

        await instance.safeTransferFrom(accounts[0], accounts[1], 0);
        let balance1Updated = await instance.balanceOf(accounts[1]);
        assert.equal(balance1Updated, 1, "Balance should not be zero");
        const balance0 = await instance.balanceOf(accounts[0]);
        assert.equal(balance0, 0, "Balance should be zero");
    });

    it("should verify that account[1] is the owner of the token 0", async function(){
        const instance = await NFTToken.deployed();
        const tokenCounter = await instance.tokenCounter();
        const currentOwner = await instance.ownerOf(tokenCounter - 1);
        assert.equal(currentOwner, accounts[1], "Incorrect owner");
    });

});