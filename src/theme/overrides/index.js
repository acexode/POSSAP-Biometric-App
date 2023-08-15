import { merge } from 'lodash';
import Card from './Card';
import Chip from './Chip';
import Tabs from './Tabs';
import Grid from './Grid';
import Link from './Link';
import Lists from './Lists';
import Table from './Table';
import Alert from './Alert';
import Paper from './Paper';
import Input from './Input';
import Radio from './Radio';
import Avatar from './Avatar';
import Slider from './Slider';
import Button from './Button';
import Switch from './Switch';
import Select from './Select';
import SvgIcon from './SvgIcon';
import Tooltip from './Tooltip';
import Popover from './Popover';
import Pickers from './Pickers';
import DataGrid from './DataGrid';
import Skeleton from './Skeleton';
import Backdrop from './Backdrop';
import Snackbar from './Snackbar';
import Progress from './Progress';
import Checkbox from './Checkbox';
import Container from './Container';
import Typography from './Typography';
import Pagination from './Pagination';
import IconButton from './IconButton';
import ButtonGroup from './ButtonGroup';
import Autocomplete from './Autocomplete';
import ToggleButton from './ToggleButton';
import ControlLabel from './ControlLabel';
import LoadingButton from './LoadingButton';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return merge(
    Tabs(theme),
    Chip(theme),
    Card(theme),
    Grid(theme),
    Link(theme),
    Input(theme),
    Radio(theme),
    Lists(theme),
    Table(theme),
    Paper(theme),
    Alert(theme),
    Switch(theme),
    Select(theme),
    Button(theme),
    Slider(theme),
    Pickers(theme),
    Tooltip(theme),
    Popover(theme),
    SvgIcon(theme),
    Checkbox(theme),
    DataGrid(theme),
    Skeleton(theme),
    Backdrop(theme),
    Snackbar(theme),
    Progress(theme),
    Container(theme),
    IconButton(theme),
    Typography(theme),
    Pagination(theme),
    ButtonGroup(theme),
    Autocomplete(theme),
    ControlLabel(theme),
    ToggleButton(theme),
    LoadingButton(theme)
  );
}
