local outputDrawer = peripheral.wrap("storagedrawers:controller_4")
local interface = peripheral.wrap("storagedrawers:controller_5")

for slot, item in pairs(interface.list()) do
    interface.pushItems(peripheral.getName(outputDrawer), slot)
end