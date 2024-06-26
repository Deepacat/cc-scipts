-- server
-- local lootChest = peripheral.wrap("quark:variant_chest_10")
-- local killerTurtle = peripheral.wrap("turtle_12")
-- local backpack = peripheral.wrap("sophisticatedbackpacks:backpack_6")
-- local outputChute = peripheral.wrap("create:smart_chute_1")
-- local operTurtle = peripheral.wrap("turtle_14")
-- local dispenser = peripheral.wrap("minecraft:dispenser_0")
-- sp
local lootChest = peripheral.wrap("quark:variant_chest_0")
local backpack = peripheral.wrap("sophisticatedbackpacks:backpack_0")
local voidChute = peripheral.wrap("create:smart_chute_0")
local dispenser = peripheral.wrap("minecraft:dispenser_1")
local redstone = peripheral.wrap("redstoneIntegrator_0")
local bpTurtleOutput = peripheral.wrap("minecraft:barrel_1")

local keptItems = {
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
}

-- chest_a.pushItems(peripheral.getName(chest_b), 2)
-- for i=1,f(x) do print(i) end
for slot, item in pairs(backpack.list()) do
    -- print((" %d x %s IN SLOT %d OF %s"):format(item.count, item.name, slot, peripheral.getName(backpack)).."\n")
    if(item.name:find("backpack")) then
        -- print(("PUSHING %d %s to %s"):format(item.count, item.name, peripheral.getName(lootChest)).."\n")
        backpack.pushItems(peripheral.getName(dispenser), slot)
        redstone.setOutput("east", true)
        os.sleep(1)
        redstone.setOutput("east", false)
        
        while true do
            local foundBackpack = false
            for slot, item in pairs(bpTurtleOutput.list()) do
                if(item.name:find("backpack")) then
                    foundBackpack = true
                end
            end

            if(foundBackpack) then
                break
            end
        end

        for slot, item in pairs(bpTurtleOutput.list()) do
            bpTurtleOutput.pushItems(peripheral.getName(lootChest), slot)
        end
    end
end