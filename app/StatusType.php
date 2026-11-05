<?php

namespace App;

enum StatusType: string
{
    case Waiting = 'waiting';
    case InService = 'in_service';
    case Finished = 'finished';
    case Cancelled = 'cancelled';
}
