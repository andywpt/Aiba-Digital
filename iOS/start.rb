#import the xcodeproj ruby gem
require 'xcodeproj'

# Create an empty file
file_path = 'Aiba Digital/App/Config.swift'
File.open(file_path, 'w') {}

#define the path to your .xcodeproj file
project_path = 'Aiba Digital.xcodeproj'
#open the xcode project
project = Xcodeproj::Project.open(project_path)
#find the group on which you want to add the file
group = project.main_group["Aiba Digital"]["App"]
#get the file reference for the file to add
file = group.new_file("Config.swift")
#add the file reference to the projects first target
main_target = project.targets.first
main_target.add_file_references([file])
#finally, save the project
project.save
