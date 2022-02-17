//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFTCollectible is ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    uint256 public constant MAX_SUPPLY = 9999;
    uint256 public constant PRICE = 0.01 ether;
    uint256 public constant MAX_PER_MINT = 2;

    string public baseTokenURI;

    // 设置nft集合的名称和nft符号
    constructor(string memory baseURI) ERC721("FUCK LASER CAT", "FUCK CAT") {
        setBaseURI(baseURI);
    }

    // 部署者为自己预留的nft
    function reserveNFTs() public onlyOwner {
        // current的实现
        // function current(Counter storage counter) internal view returns (uint256) {
        //     return counter._value;
        // }

        uint256 totalMinted = _tokenIds.current();
        require(totalMinted.add(10) < MAX_SUPPLY, "Not enough NFTs");
        for (uint256 i = 0; i < 10; i++) {
            _mintSingleNFT();
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function mintNFTs(uint256 _count) public payable {
        uint256 totalMinted = _tokenIds.current();
        require(totalMinted.add(_count) <= MAX_SUPPLY, "Not enough NFTs!");
        require(
            _count > 0 && _count <= MAX_PER_MINT,
            "Cannot mint specified number of NFTs."
        );
        require(
            msg.value >= PRICE.mul(_count),
            "Not enough ether to purchase NFTs."
        );
        for (uint256 i = 0; i < _count; i++) {
            _mintSingleNFT();
        }
    }

    function _mintSingleNFT() private {
        uint256 newTokenID = _tokenIds.current();
        _safeMint(msg.sender, newTokenID);
        _tokenIds.increment();
    }

    // 获取指定地址拥有nft的具体信息
    function tokensOfOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        // balanceOf和tokenOfOwnerByIndex都是ERC721Enumerable的内置方法
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokensId;
    }

    // 从合约中把eth转给部署者
    function withdraw() public payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");
        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }
}
