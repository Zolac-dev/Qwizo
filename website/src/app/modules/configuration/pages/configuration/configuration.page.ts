import { Component } from '@angular/core';
import { ElectronService } from '../../../../core/services/electron.service';
import { IConfiguration } from '../../models/iConfiguration';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './configuration.page.html',
  styleUrl: './configuration.page.scss'
})
export class ConfigurationPage {

  // config : IConfiguration = {}

  form: FormGroup = new FormGroup({
    "server_port": new FormControl(undefined,[Validators.required,Validators.pattern("^[0-9]*$")]),
    "users_message_max": new FormControl(undefined,[Validators.required, Validators.pattern("^[0-9]*$")]),
    "twitch_broadcast_id": new FormControl(undefined,Validators.required),
    "twitch_bot_id": new FormControl(undefined,Validators.required),
    "twitch_bot_secret": new FormControl(undefined, Validators.required)
  });

  constructor(private electron : ElectronService){

    this.electron.invoke("configuration:get").then((config)=>{
      this.form.get("server_port")?.setValue(config?.server?.port)
      this.form.get("users_message_max")?.setValue(config?.users?.messages?.max)
      this.form.get("twitch_broadcast_id")?.setValue(config?.twitch?.broadcastId)
      this.form.get("twitch_bot_id")?.setValue(config?.twitch?.bot?.id)
      this.form.get("twitch_bot_secret")?.setValue(config?.twitch?.bot?.secret)

    })
  }
  saving : boolean = false
  save(){
    if(this.saving) return;
    this.saving = true
    this.electron.invoke("configuration:update",{
      server: {
        port: this.form.get("server_port")?.value
      },
      users: {
        messages: {
          max: this.form.get("users_message_max")?.value
        }
      },
      twitch: {
        broadcastId: this.form.get("twitch_broadcast_id")?.value,
        bot: {
          id: this.form.get("twitch_bot_id")?.value,
          secret: this.form.get("twitch_bot_secret")?.value
        }
      }
    }).then(()=>{
      setTimeout(()=>{
        this.saving = false
      },1000)
    })
  }
}
