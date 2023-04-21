#### [Pm2](https://pm2.keymetrics.io/docs/usage/log-management/) Application Logs

##### Display all apps logs in realtime
```
pm2 logs
```


##### To display application’s log you can use the command pm2 logs
```
-l --log [path]              specify filepath to output both out and error logs
-o --output <path>           specify out log file
-e --error <path>            specify error log file
--time                       prefix logs with standard formatted timestamp
--log-date-format <format>   prefix logs with custom formatted timestamp
--merge-logs                 when running multiple process with same app name, do not split file by id
```

