const urls = [
  "//images.ctfassets.net/8atb7a9mpajr/vNPajHebT4sfQhfe1NMUX/db5d30dc2a47c81cf4d4fb760837197d/DSCF1683.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/4oRrceJqFZX3wOS41pY2Cz/4d6da1a16d65506213456b5785913f2a/May-Try46802.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/7gPaL222V0u9sMtvI2kdTb/f872474fa26d935b584bc6ea8511f279/Artboard_1-6.1.JPG",
  "//images.ctfassets.net/8atb7a9mpajr/3hoXRontrYSyyM4eNW0vgI/c834b882b18e4231dbabba4aca25548f/DSCF1704.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/36rd28RXO13prR8vZhr3Xh/aebe7c7659276b3645f0e39d89ac1c43/5F3A9040.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/3s0maN69O6rA7Itfse5LL/72a0aa1387b5cce6258c23760e7e272a/5F3A4863.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/19ben1K3tFWchS2nCAIzqc/ef98d6cf26fed5301e4ddb3d034eedd3/5F3A8985.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/6Z5sJFQO4hVVxq9Zr0fIox/808eb9cf8db97de9e75a2ab28458bfc5/DSC0081902_-_01-2.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/6ADz7tz4wg4dT5gtj2heDZ/deb95f9029621dad3e2efd22183bf70e/5F3A8934.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/7BQryj0W8WNKNRSenXY8OH/64c04ea3601a13b1c2e8e5cd480c02f5/5F3A8993.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/56Nox7TMQw4lyJec9VniU8/477bebaba007fec0d3dbec86e7d1b172/5F3A5177.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/5GHEySmqQu9DBuuFJ3JwKi/c372bc4c57bca9123182c72d6c29da96/DSCF1889-2.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/1d9T6vaEJ93a5UCKVOpSvE/e998c0fee87aa1417aaf2246fb98741c/MayTry_189.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/1NsgWDeU7MldiDf5wRZZkA/01d0e30cd21bbfb0e45295668315e540/DSCF1753.JPG",
  "//images.ctfassets.net/8atb7a9mpajr/5SllwYv6AvRcJp6SgZHXcT/b17dce2d58aeec043648d924596d2027/DSCF1968-2.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/6eLYlcYFIaInmUogRuSzFJ/946e989c020fbd7204cb5cfc490e7b78/DSCF2081-2-2.JPG",
  "//images.ctfassets.net/8atb7a9mpajr/4NfEx8DaboovttEdLf3EME/8f45e123763677e7240cc7c19cca64c8/DSCF2183.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/3xY6oseFMvu16rnKSQNcxU/d6456ecafaa00bbd37b17a7bc7c3ab93/26-6.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/6pusyzJOCdPCKlUZqNuSB5/d64d4471e9c0391f1ae5932b078aa756/1__126_.JPG",
  "//images.ctfassets.net/8atb7a9mpajr/26o7UnutOUm2gQkNpU4NX1/dfe73892d8a82c538a88efdcc7484b2d/1__252_.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/35KY1frS8FSYc4VuN1xWOu/09623aa3fd18e765fa404bdfcb686643/1__312_.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/6E6UpCJPp6L2l7qeKHOWsG/f7410881e3b20cf0e491608ed1f892fe/1__188__cut.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/7blTMrl7G1lWe9Rgd36DSZ/a7b11f58a548feca8df74f2c53e71ea0/May-Try46494.JPG",
  "//images.ctfassets.net/8atb7a9mpajr/3IgKtJt0LvbMQ2gtFJMA8w/a6151b527299c672a63ec860a5ac12cf/DSC05692.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/5SSiaTCPvGbjfWVIkKZmn7/6ef9029efc6cabedff2d4841dcbedd4e/May-Try46616.JPG",
  "//images.ctfassets.net/8atb7a9mpajr/47x0JcOASQTWU1n79NSwr8/35b6ad54ec6706521ef757fbafc41100/001_0358.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/2tX8SgUxq0MUp3RgHaXbwf/7b05f4107d2879c7781aa9c96bef18b3/MayTry_074.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/5XiljKo9mtOuQnZ4rI5RI2/8d4e685419dd7fdcf9ccd5ed64d5aafc/8394__2_.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/48qYCqBS1kKWQRx6KHk0Xa/c275a884097f57d83b21ed002c11f364/8490__2_.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/5wsmwnDsFBw0Q2eVKAsgnD/5fef7e030b4efa47a2b52b91c25086f8/серж113089-6.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/1RU7yPnDPZRTe9tLyE0IFK/2a7053bc998174890cef8bd71c66774e/IMG_9021.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/3If3xNxlrJv5lLK5cVnLxc/273a887943a8452eb5d982e20dc8a32a/IMG_9078.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/3oo4U0c4toCabscEPIym9D/00d1b192237d62e77891b412c1366944/DSC0096505_-_15.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/5PyzoJ1YbaRtIuXra6ZTyM/42b0748bf83389eebace52367c348e44/DSC0093304_-_29.jpg",
  "//images.ctfassets.net/8atb7a9mpajr/5mIDNEXcqeFzMWlW37QVXE/d9b07fd2e3eeac819b95ceb604ef1cab/DSC0087703_-_11.jpg"
]


export default urls
