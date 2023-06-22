import { Injectable } from '@angular/core';

import { Capacitor} from '@capacitor/core';
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection, capSQLiteSet,
         capSQLiteChanges, capSQLiteValues, capEchoResult, capSQLiteResult,
         capNCDatabasePathResult, JsonSQLite, 
         capSQLiteOptions, capSQLiteQueryOptions, capSQLiteSetOptions, capConnectionOptions, capSQLiteExecuteOptions } from '@capacitor-community/sqlite';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Storage } from "@ionic/storage-angular";


import {BehaviorSubject} from 'rxjs';

const DB_SETUP_KEY = 'first_db_setup';
const DB_NAME_KEY = 'db_name';
var opt: capSQLiteOptions = {};
opt.database = "user-db";
opt.readonly = false;
@Injectable()

export class SQLiteService {
constructor(private http: HttpClient, private storage: Storage){}
sqlite = new SQLiteConnection(CapacitorSQLite);
dbName = '';


getProductList() {
  const statement = 'SELECT * FROM users;';
  var options: capSQLiteQueryOptions = {};
  options.database = "user-db";
  options.readonly = false;
  options.statement = statement;
  options.values = [];
  return CapacitorSQLite.query(options);
  
  
  
}


getSurveyList() {
  const statement = 'SELECT * FROM surveys;';
  var options: capSQLiteQueryOptions = {};
  options.database = "user-db";
  options.readonly = false;
  options.statement = statement;
  options.values = [];
  return CapacitorSQLite.query(options);

}

createUser(array:any[]) {
  const statement = 'INSERT INTO users VALUES(?,?,?,?,?)';
  var options: capSQLiteSet = {};
  options.statement = statement;
  options.values = array;
  var main :capSQLiteSetOptions= {};
  main.database = "user-db";
  main.readonly = false;
  main.set = [options];
  main.transaction =true;

 return CapacitorSQLite.executeSet(main);
  
  
  
}
createSurveys(array:any[]){
  const statement = 'INSERT INTO surveys VALUES(?,?,?,?,?)';
  var options: capSQLiteSet = {};
  options.statement = statement;
  options.values = array;
  var main :capSQLiteSetOptions= {};
  main.database = "user-db";
  main.readonly = false;
  main.set = [options];
  main.transaction =true;

 return CapacitorSQLite.executeSet(main);
}

async createConnection() {
  var conn: capConnectionOptions = {};
  conn.database = "user-db";
  conn.encrypted = false;
  conn.mode = "full";
  conn.readonly = false;
  conn.version = 1;
  return CapacitorSQLite.createConnection(conn);
}

async openConnection() {
  return CapacitorSQLite.open({ database: "user-db" });
}

async createSurveyTables(tableName:string) {
  var exec:  capSQLiteExecuteOptions = {};
  exec.database = "user-db";
  exec.readonly = false;
  exec.statements = `CREATE TABLE IF NOT EXISTS ${tableName} ( id INTEGER PRIMARY KEY ,product varchar(255), yearsOfUsage integer(20), rate varchar(20), isFutureCustomer varchar(255))`;
  exec.transaction = true;
  CapacitorSQLite.execute(exec).then((res)=>{
    
  });
}


async createTables(tableName:string) {
  var exec:  capSQLiteExecuteOptions = {};
  exec.database = "user-db";
  exec.readonly = false;
  exec.statements = `CREATE TABLE IF NOT EXISTS ${tableName} (id integer, name varchar(255),email varchar(255), phoneNo integer(20), password varchar(20))`;
  exec.transaction = true;
  CapacitorSQLite.execute(exec).then((res)=>{
    
  });
}
async getTables() {
  return CapacitorSQLite.getTableList(opt);
}

async init(): Promise<void> {

    try {
      const sqlite = CapacitorSQLite as any;
      await sqlite.requestPermissions();
      this.createConnection().then(res=>{
        this.openConnection().then(res=>{
        })
      });
      
      
      
    } catch (e) {
      
    }
  
}



}