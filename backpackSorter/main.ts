import { peripheral as completionPeriph } from "cc.completion";
import * as event from "./event";

// Put your code here
const pullBackpack = peripheral.wrap("sophisticatedbackpacks:backpack_6") as InventoryPeripheral
const valuableOutput = peripheral.wrap("quark:variant_chest_13") as InventoryPeripheral
const voidChute = peripheral.wrap("quark:variant_chest_14") as InventoryPeripheral
const dispenser = peripheral.wrap("minecraft:dispenser_1") as InventoryPeripheral
const turtleOutputBarrel = peripheral.wrap("minecraft:barrel_78") as InventoryPeripheral
const monitor = peripheral.wrap("monitor_29") as MonitorPeripheral
const redstoneIntegrator = peripheral.wrap("redstoneIntegrator_1") as typeof redstone;

const keptItems = [
    "minecraft:diamond",
    "minecraft:emerald",
    "minecraft:gold_ingot",
    "minecraft:iron_ingot",
    "minecraft:diamond_helmet",
    "minecraft:diamond_chestplate",
    "minecraft:diamond_leggings",
    "minecraft:diamond_boots",
    "minecraft:diamond_shovel",
    "minecraft:diamond_pickaxe",
    "minecraft:diamond_sword",
    "minecraft:diamond_horse_armor",
    "sophisticatedbackpacks:diamond_backpack",
    "sophisticatedbackpacks:netherite_backpack"
]
monitor.setTextScale(0.5)
monitor.setCursorPos(1, 1)
monitor.setTextColor(colors.white)
monitor.clear()
term.redirect(monitor)


print(os.date('%H:%M:%S') + ' started, waiting for a backpack')
while (true) {
    os.sleep(1)
    function filteredName(name: string) {
        let filtered = name.split(":")[1]
        filtered = filtered.replaceAll("_", " ")
        return filtered
    }
    // print(os.date('%H:%M:%S') + ' looking for backpack')
    Object.entries(pullBackpack.list()).forEach(([slot, item]) => {
        // print(`Slot ${slot}: ${item.name} x ${item.count}`)
        if (item.name.includes('backpack')) {
            print(os.date('%H:%M:%S') + ' backpack found, putting in dispenser')
            pullBackpack.pushItems(peripheral.getName(dispenser), parseInt(slot))
            print(os.date('%H:%M:%S') + ' activating dispenser')
            redstoneIntegrator.setOutput("east", true)
            os.sleep(1)
            print(os.date('%H:%M:%S') + ' deactivating dispenser')
            redstoneIntegrator.setOutput("east", false)

            print(os.date('%H:%M:%S') + ' backpack being emptied')
            while (true) {
                let foundbackpack = false
                Object.entries(turtleOutputBarrel.list()).forEach(([slot, item]) => {
                    if (item.name.includes('backpack')) {
                        foundbackpack = true
                    }
                })
                if (foundbackpack) {
                    print(os.date('%H:%M:%S') + ' Lets go gambling!')
                    Object.entries(turtleOutputBarrel.list()).forEach(([slot, item]) => {
                        if (keptItems.includes(item.name)) {
                            monitor.setTextColor(colors.lightBlue)
                            print(os.date('%H:%M:%S') + ` Drrrrr I can't stop winning! (${item.count} ${filteredName(item.name)})`)
                            monitor.setTextColor(colors.white)
                            turtleOutputBarrel.pushItems(peripheral.getName(valuableOutput), parseInt(slot))
                        }

                        else {
                            monitor.setTextColor(colors.red)
                            print(os.date('%H:%M:%S') + ` Drrrrr aww dangit (${item.count} ${filteredName(item.name)})`)
                            monitor.setTextColor(colors.white)
                            turtleOutputBarrel.pushItems(peripheral.getName(voidChute), parseInt(slot))
                            os.sleep(1)
                        }
                    })
                    print(os.date('%H:%M:%S') + ' finished moving items, waiting for another backpack')
                    break
                }
            }
        }
    })
}
