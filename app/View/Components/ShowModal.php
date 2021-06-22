<?php

namespace App\View\Components;

use Illuminate\View\Component;

class ShowModal extends Component
{
   public $modalTitle;
   public $modalId;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($modalTitle ='show Modal' , $modalId = 'showModalid' )
    {
      $this->modalTitle = $modalTitle;
      $this->modalId = $modalId;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return view('components.show-modal');
    }
}
