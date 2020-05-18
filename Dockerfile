#首先使用FROM AS 的指令从docker官方的镜像仓库中下载得到编译工程的SDK
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
#暴露容器的80端口
EXPOSE 80
EXPOSE 443
#设置/app为根目录
WORKDIR /app

#COPY方法 第一个参数为当前目录 其次是容器构建的目标目录
#将.Net工程的sln解决方案文件，以及各个依赖工程的csproj项目文件拷如容器对应目录为后面build做准备
COPY *.sln .
COPY Switches/*.csproj ./Switches/
COPY Switches.Data/*.csproj ./Switches.Data/
#运行detnet指令还原项目所有的nuget依赖
RUN dotnet restore

#将所有的代码等文件拷如容器中
COPY Switches/. ./Switches/
COPY Switches.Data/. ./Switches.Data/
WORKDIR /app/Switches
#打包发布整个工程
RUN dotnet publish -c Release -o out

#从官方仓库引入aspnetcore3的运行环境
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime
WORKDIR /app
#将打包发布得到的dll等文件考入 /out./ 目录
COPY --from=build /app/Switches/out ./
#设置入口dll为BackEndDemo（即最上层的webapi）
ENTRYPOINT ["dotnet", "Switches.dll"]



# FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
# WORKDIR /app
# EXPOSE 80
# EXPOSE 443

# FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
# WORKDIR /src
# COPY ["Switches/Switches.csproj", "Switches/"]
# COPY ["Switches.Data/Switches.Data.csproj", "Switches.Data/"]
# RUN dotnet restore "Switches/Switches.csproj"
# COPY . .
# WORKDIR "/src/Switches"
# RUN dotnet build "Switches.csproj" -c Release -o /app/build
# WORKDIR "/src/Switches.Data"
# RUN dotnet build "Switches.Data.csproj" -c Release -o /app/build

# FROM build AS publish
# RUN dotnet publish "Switches.csproj" -c Release -o /app/publish

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "Switches.dll"]